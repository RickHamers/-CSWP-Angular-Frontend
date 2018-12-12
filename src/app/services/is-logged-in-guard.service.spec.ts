import { TestBed } from '@angular/core/testing';

import { IsLoggedInGuardService } from './is-logged-in-guard.service';

describe('IsLoggedInGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsLoggedInGuardService = TestBed.get(IsLoggedInGuardService);
    expect(service).toBeTruthy();
  });
});
