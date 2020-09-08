import { TestBed } from '@angular/core/testing';

import { RequestStateGuard } from './request-state.guard';

describe('RequestStateGuard', () => {
  let guard: RequestStateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RequestStateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
