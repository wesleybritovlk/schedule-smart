import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/schedulesmart/auth.service';
import { AuthScope } from '../services/schedulesmart/scope.service';
import { TokenService } from '../services/schedulesmart/token.service';

const isAuthUrl = (url: string) => url.includes('/auth/');

const isRefreshUrl = (url: string) => url.includes('/auth/refresh');

const resolveScopeFromUrl = (url: string): AuthScope => {
  if (url.includes('/painel') || url.includes('/company') || url.includes('/companies')) return 'company';
  return 'user';
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenService);
  const auth = inject(AuthService);

  const scope = resolveScopeFromUrl(req.url);
  const token = tokens.getToken(scope);

  const skip = isAuthUrl(req.url);
  const authReq = !skip && token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthUrl(req.url) && !isRefreshUrl(req.url)) {
          return auth.refreshToken(scope).pipe(
            switchMap(() => {
              const newToken = tokens.getToken(scope);
              const retry = newToken
                ? authReq.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
                : authReq;
              return next(retry);
            }),
            catchError(err => throwError(() => err))
          );
      }
      return throwError(() => error);
    })
  );
};
