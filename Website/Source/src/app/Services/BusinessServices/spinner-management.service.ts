import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class SpinnerManagementService {
  private openConnections = 0;

  constructor(private readonly spinner: NgxSpinnerService) {}

  show() {
    if (this.openConnections === 0) {
      this.spinner.show();
    }
    this.incrementConnections();
  }

  hide() {
    this.decrementConnections();
    if (this.openConnections === 0) {
      this.spinner.hide();
    }
  }
  incrementConnections() {
    this.openConnections++;
  }

  decrementConnections(): void {
    if (this.openConnections > 0) {
      this.openConnections--;
    }
  }
}
