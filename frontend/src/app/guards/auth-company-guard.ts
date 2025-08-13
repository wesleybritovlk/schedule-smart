import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/schedulesmart/auth.service';

export const authCompanyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn('company')) {
    return true;
  } else {
    router.navigate(['/painel/entrar']);
    return false;
  }
};
