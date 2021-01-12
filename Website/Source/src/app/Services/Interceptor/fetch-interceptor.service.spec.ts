import { TestBed } from '@angular/core/testing';

import { FetchInterceptorService } from './fetch-interceptor.service';

describe('FetchInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchInterceptorService = TestBed.get(FetchInterceptorService);
    expect(service).toBeTruthy();
  });
});
