import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CONFIG } from '../auth-center.config';
import { IConfig } from '../interfaces/config.interface';
import { RequestState } from '../request_state';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private requestState$: BehaviorSubject<string>;
  private jwt$: BehaviorSubject<string>;

  constructor(@Inject(CONFIG) private config: IConfig) {
    this.requestState$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.state));
    this.jwt$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.jwt));
  }

  getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated$.next(isAuthenticated);
  }

  getRequestState$(): Observable<RequestState> {
    return this.requestState$.asObservable().pipe(map(state => new RequestState(state)));
  }

  setRequestState(requestState: RequestState): void {
    localStorage.setItem(this.config.storageNaming.state, requestState.value);
    this.requestState$.next(requestState.value);
  }

  removeRequestState(): void {
    localStorage.removeItem(this.config.storageNaming.state);
    this.requestState$.next(null);
  }

  setJwt(jwt: string): void {
    localStorage.setItem(this.config.storageNaming.jwt, jwt);
    this.jwt$.next(jwt);
  }

  getJwt(): string {
    return this.jwt$.getValue();
  }
}
