import { TestBed } from '@angular/core/testing';

import { SecurityGuardService } from './security-guard.service';

describe('SecurityGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityGuardService = TestBed.get(SecurityGuardService);
    expect(service).toBeTruthy();
  });
});
