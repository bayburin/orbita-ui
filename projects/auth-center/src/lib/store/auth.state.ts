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
  private isAuthenticated$: BehaviorSubject<boolean>;
  private requestState$: BehaviorSubject<string>;
  private jwt$: BehaviorSubject<string>;
  private returnUrl$: BehaviorSubject<string>;
  private isLoading$: BehaviorSubject<boolean>;
  private error$: BehaviorSubject<any>;

  constructor(@Inject(CONFIG) private config: IConfig) {
    this.requestState$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.state));
    this.jwt$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.jwt));
    this.returnUrl$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.returnUrl));
    this.isLoading$ = new BehaviorSubject(false);
    this.error$ = new BehaviorSubject(null);

    let isAuth = false;
    if (this.getJwt()) {
      isAuth = true;
    }
    this.isAuthenticated$ = new BehaviorSubject(isAuth);
  }

  getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
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

  getJwt(): string {
    return this.jwt$.getValue();
  }

  setJwt(jwt: string): void {
    localStorage.setItem(this.config.storageNaming.jwt, jwt);
    this.jwt$.next(jwt);
  }

  removeJwt(): void {
    localStorage.removeItem(this.config.storageNaming.jwt);
    this.jwt$.next(null);
  }

  getReturnUrl(): string {
    return this.returnUrl$.getValue();
  }

  setReturnUrl(url: string): void {
    localStorage.setItem(this.config.storageNaming.returnUrl, url);
    this.returnUrl$.next(url);
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }

  getError$(): Observable<any> {
    return this.error$.asObservable();
  }

  setError(error: any): void {
    this.error$.next(error);
  }
}
