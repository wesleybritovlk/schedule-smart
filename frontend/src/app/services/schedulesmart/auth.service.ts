import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Response } from './common.response';
import { AuthScope, ScopeService } from './scope.service';
import { TokenService } from './token.service';
import { AutoRefreshService } from './auto-refresh.service';

export interface Token {
  access_token: string;
  expires_in: number;
}

export interface CompanyLogin {
  cnpj: string;
  password: string;
}

export interface CompanyRegister {
  cnpj: string;
  password: string;
  name: string;
  legal_name: string;
  slug: string;
  contact_full_name: string;
  contact_email: string;
  contact_phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly tokens = inject(TokenService);
  readonly scopes = inject(ScopeService);
  readonly autoRefreshs = inject(AutoRefreshService);
  readonly apiUrl = environment.api_url;
  readonly http = inject(HttpClient);
  readonly version = '/api/v1';
  readonly path = '/auth';

  constructor() { }

  companyLogin(body: CompanyLogin): Observable<Token> {
    return this.http.post<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/login/company`, body)
      .pipe(
        map(res => res.data),
        tap(token => {
          this.tokens.setToken('company', token.access_token, token.expires_in);
          this.scopes.set('company');
          this.autoRefreshs.arm('company', token.expires_in, () => this.refreshToken('company').subscribe());
        })
      );
  }

  companyRegister(body: CompanyRegister): Observable<Token> {
    return this.http.post<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/register/company`, body)
      .pipe(
        map(res => res.data),
        tap(token => {
          this.tokens.setToken('company', token.access_token, token.expires_in);
          this.scopes.set('company');
          this.autoRefreshs.arm('company', token.expires_in, () => this.refreshToken('company').subscribe());
        })
      );
  }

  refreshToken(scope: AuthScope): Observable<Token> {
    const current = this.tokens.getToken(scope);
    const headers = current
      ? new HttpHeaders({ Authorization: `Bearer ${current}` })
      : new HttpHeaders();
    return this.http.get<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/refresh`, { headers })
      .pipe(
        map(res => res.data),
        tap(token => {
          this.tokens.setToken(scope, token.access_token, token.expires_in);
          this.autoRefreshs.arm(scope, token.expires_in, () => this.refreshToken(scope).subscribe());
        })
      );
  }

  logout(scope: AuthScope): void {
    this.tokens.clearToken(scope);
    this.autoRefreshs.cancel(scope);
    if (this.scopes.get() === scope)
      this.scopes.set(null);
  }

  isLoggedIn(scope: AuthScope): boolean {
    const isValid = this.tokens.hasValidToken(scope);
    if (isValid)
      this.scopes.set(scope);
    return isValid;
  }

}
