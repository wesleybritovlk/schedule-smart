import { Injectable } from '@angular/core';
import { AuthScope } from './scope.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private getKey(scope: AuthScope, type: 'token' | 'exp'): string {
    return `${scope}_access_${type}`;
  }

  setToken(scope: AuthScope, token: string, expiresInSeconds: number) {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem(this.getKey(scope, 'token'), token);
    localStorage.setItem(this.getKey(scope, 'exp'), String(expiresAt));
  }

  getToken(scope: AuthScope): string | null {
    return localStorage.getItem(this.getKey(scope, 'token'));
  }

  getExpiresAt(scope: AuthScope): number | null {
    const raw = localStorage.getItem(this.getKey(scope, 'exp'));
    return raw ? Number(raw) : null;
  }

  hasValidToken(scope: AuthScope): boolean {
    const token = this.getToken(scope);
    const exp = this.getExpiresAt(scope);
    return !!token && typeof exp === 'number' && Date.now() < exp;
  }

  clearToken(scope: AuthScope) {
    localStorage.removeItem(this.getKey(scope, 'token'));
    localStorage.removeItem(this.getKey(scope, 'exp'));
  }
}
