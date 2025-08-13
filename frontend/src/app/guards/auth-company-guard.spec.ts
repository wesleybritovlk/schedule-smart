import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authCompanyGuard } from './auth-company-guard';

describe('authCompanyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authCompanyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
