import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AuthScope = 'company' | 'user';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {
  readonly current = new BehaviorSubject<AuthScope | null>(null);

  set(scope: AuthScope | null) {
    this.current.next(scope);
  }

  get(): AuthScope | null {
    return this.current.value;
  }

  select(): Observable<AuthScope | null> {
    return this.current.asObservable();
  }
}
