import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Response } from './common.response';
import { TokenService } from './token.service';

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
  readonly tokenService = inject(TokenService);
  readonly apiUrl = environment.api_url;
  readonly http = inject(HttpClient);
  readonly version = '/api/v1';
  readonly path = '/auth';

  constructor() { }

  companyLogin(company: CompanyLogin) {
    return this.http.post<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/login/company`, company);
  }

  companyRegister(company: CompanyRegister) {
    return this.http.post<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/register/company`, company);
  }

  refreshToken() {
    return this.http.get<Response<Token>>(`${this.apiUrl}${this.version}${this.path}/refresh`);
  }

}
