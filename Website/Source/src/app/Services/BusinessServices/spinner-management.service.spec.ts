import { TestBed } from '@angular/core/testing';

import { SpinnerManagementService } from './spinner-management.service';

describe('SpinnerManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnerManagementService = TestBed.get(SpinnerManagementService);
    expect(service).toBeTruthy();
  });
});
