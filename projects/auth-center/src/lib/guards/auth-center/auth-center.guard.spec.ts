import { TestBed } from '@angular/core/testing';

import { AuthCenterGuard } from './auth-center.guard';

describe('AuthCenterGuard', () => {
  let guard: AuthCenterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCenterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
