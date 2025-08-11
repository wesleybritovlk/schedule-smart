import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { slugExistenceGuard } from './slug-existence-guard';

describe('slugExistenceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => slugExistenceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
