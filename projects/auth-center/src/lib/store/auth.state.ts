import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentUser } from '../models/current_user.model';
import { CONFIG } from '../auth-center.config';
import { IConfig } from '../interfaces/config.interface';
import { RequestState } from '../request_state';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private currentUser$ = new BehaviorSubject<CurrentUser>(null);
  private authState$: BehaviorSubject<string>;
  private jwt$: BehaviorSubject<string>;

  constructor(@Inject(CONFIG) private config: IConfig) {
    this.authState$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.state));
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

  getAuthState$(): Observable<RequestState> {
    return this.authState$.asObservable().pipe(map(state => new RequestState(state)));
  }

  setAuthState(authState: RequestState): void {
    localStorage.setItem(this.config.storageNaming.state, authState.value);
    this.authState$.next(authState.value);
  }

  removeAuthState(): void {
    localStorage.removeItem(this.config.storageNaming.state);
    this.authState$.next(null);
  }

  setJwt(jwt: string): void {
    localStorage.setItem(this.config.storageNaming.jwt, jwt);
    this.jwt$.next(jwt);
  }

  getJwt(): string {
    return this.jwt$.getValue();
  }

  getCurrentUser$(): Observable<CurrentUser> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(currentUser: CurrentUser): void {
    this.currentUser$.next(currentUser);
  }
}
