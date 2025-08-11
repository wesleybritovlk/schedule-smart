import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Response } from './common.response';

export interface Info {
  name: string;
  version: string;
  description: string;
  documentation_swagger: string;
  documentation_redoc: string;
  api: string;
  database: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly apiUrl = environment.api_url;
  readonly http = inject(HttpClient);

  constructor() { }

  getApiInfo() {
    return this.http.get<Response<Info>>(`${this.apiUrl}`);
  }
}
