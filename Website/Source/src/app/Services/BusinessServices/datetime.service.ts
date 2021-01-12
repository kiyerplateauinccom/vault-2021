import { Injectable } from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";
import { Options, LabelType } from "ng5-slider";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DatetimeService {
  overallDateRange: DateRange;
  incrementalDates: DateRange[] = [];

  options: Options;

  incrementMinutes: number = 15;

  constructor() {
    this.overallDateRange = new DateRange();
  }

  public setIncrementMinutes(minutes: number) {
    this.incrementMinutes = minutes;
  }

  public buildIncrements(): void {
    if (this.overallDateRange) {
      if (this.overallDateRange.isStartDateLessThanEndDate) {
        this.incrementalDates = [];
        const intervalCount = this.overallDateRange.getIntervalCount(
          this.incrementMinutes
        );
        let startDate = this.overallDateRange.clone(
          this.overallDateRange.startMoment
        );
        for (let index = 0; index < intervalCount; index++) {
          if (index > 0) {
            startDate = this.overallDateRange
              .clone(startDate)
              .add(this.incrementMinutes, "m");
          }
          let newRange = new DateRange();
          newRange.setStartMoment(this.overallDateRange.clone(startDate));

          newRange.setEndMoment(
            this.overallDateRange
              .clone(startDate)
              .add(this.incrementMinutes, "m")
          );
          this.incrementalDates.push(newRange);
        }
      }
    }
  }

  public buildOptions(): void {
    if (this.overallDateRange) {
      if (this.overallDateRange.isStartDateLessThanEndDate) {
        this.options = {
          showTicks: true,
          showTicksValues: false,
          floor: 0,
          ceil: this.incrementalDates.length - 1,
          translate: (value: number, label: LabelType): string => {
        
            return this.incrementalDates[value].getUTCRangeString();
          }
        };
      }
    }
  }

  public initialize(
    startDate: Moment,
    endDate: Moment,
    isForceToQuarter: boolean = false,
    incrementMinutes: number = 15
  ): void {
    this.incrementMinutes = incrementMinutes;
    this.overallDateRange = new DateRange();
    this.overallDateRange.setStartMoment(startDate);
    this.overallDateRange.setEndMoment(endDate);
    if (isForceToQuarter) {
      this.overallDateRange.setDatesToNearestQuarer();
    }
    this.rebuild(false);
  }

  public rebuild(isForceToQuarter: boolean): void {
    if (isForceToQuarter) {
      this.overallDateRange.setDatesToNearestQuarer();
    }
    this.buildIncrements();
    this.buildOptions();
  }

  public getRange(index: number): DateRange {
    if (index < this.incrementalDates.length) {
      return this.incrementalDates[index];
    }
    return null;
  }

  getDateAsUtcString(date: Date): string {
    return moment(date)
      .utc()
      .format(environment.dates.stringFormat);
  }
}

export class DateRange {
  startDate: Date;
  endDate: Date;

  startMoment: Moment;
  endMoment: Moment;

  constructor() {}

  setStartDate(startDate: Date) {
    this.setStartMoment(moment(startDate).utc());
  }

  setStartMoment(startMoment: Moment) {
    this.startMoment = startMoment;
    this.startDate = this.startMoment.toDate();
  }

  setEndDate(endDate: Date) {
    this.setEndMoment(moment(endDate).utc());
  }

  setEndMoment(endMoment: Moment) {
    this.endMoment = endMoment;
    this.endDate = this.endMoment.toDate();
  }

  get isStartDateLessThanEndDate(): boolean {
    return this.startDate < this.endDate;
  }

  get isStartMomentLessThanEndMoment(): boolean {
    return this.startMoment < this.endMoment;
  }

  getUTCStartDateString(): string {
    return this.startMoment.format(environment.dates.stringFormat);
  }

  getUTCEndDateString(): string {
    return this.endMoment.format(environment.dates.stringFormat);
  }

  getDateAsUtcString(date: Date): string {
    return moment(date)
      .utc()
      .format(environment.dates.stringFormat);
  }

  get startDateJson(){
    return this.getJSONString(this.startMoment);
  }

  get endDateJson(){
    return this.getJSONString(this.endMoment);
  }

  getJSONString(thisMoment: Moment) :string{
    return thisMoment.format(environment.dates.jsonFormat) + "Z";
  }

  getUTCRangeString(): string {
    return `${this.getUTCStartDateString()} ~ ${this.getUTCEndDateString()}`;
  }

  setDatesToNearestQuarer(): void {
    this.setStartDateToNearestQuarter();
    this.setEndDateToNearestQuarter();
  }

  setStartDateToNearestQuarter(): void {
    this.setStartDate(this.setDateToNearestQuarter(this.startDate));
  }

  setEndDateToNearestQuarter(): void {
    this.setEndDate(this.setDateToNearestQuarter(this.endDate, 15));
  }

  private setDateToNearestQuarter(date: Date, minutesToAdd: number = 0): Date {
    date.setMinutes((Math.floor(date.getMinutes() / 15) * 15) % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return moment(date)
      .add(minutesToAdd, "m")
      .toDate();
  }

  get diffMinutes(): number {
    return this.endMoment.diff(this.startMoment) / (1000 * 60);
  }

  getIntervalCount(intervalSpan: number): number {
    return this.diffMinutes / intervalSpan;
  }

  clone(dateMoment: Moment): Moment {
    return moment(dateMoment.toDate().toString()).utc();
  }
}
