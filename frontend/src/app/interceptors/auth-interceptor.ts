import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthScope } from '../services/schedulesmart/scope.service';
import { TokenService } from '../services/schedulesmart/token.service';

const resolveScopeFromUrl = (url: string): AuthScope => {
  if (url.includes('/painel') || url.includes('/company') || url.includes('/companies')) return 'company';
  return 'user';
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenService);
  const scope = resolveScopeFromUrl(req.url);
  const token = tokens.getToken(scope);
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(clonedReq).pipe(catchError((err) => throwError(() => err)));
};
