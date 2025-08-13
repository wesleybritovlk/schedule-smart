import { Injectable } from '@angular/core';
import { AuthScope } from './scope.service';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoRefreshService {
  readonly timers = new Map<AuthScope, Subscription>();
  readonly skewMs = 30_000;

  arm(scope: AuthScope, expiresInSeconds: number, callback: () => void) {
    this.cancel(scope);
    const delay = Math.max(expiresInSeconds * 1000 - this.skewMs, 5000);
    const sub = timer(delay).subscribe(callback);
    this.timers.set(scope, sub);
  }

  cancel(scope: AuthScope) {
    const sub = this.timers.get(scope);
    if (sub) {
      sub.unsubscribe();
      this.timers.delete(scope);
    }
  }

  cancelAll() {
    this.timers.forEach((_, scope) => this.cancel(scope));
  }
}
