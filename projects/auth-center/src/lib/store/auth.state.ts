import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CurrentUser } from '../models/current_user.model';
import { CONFIG } from '../auth-center.config';
import { IConfig } from '../interfaces/config.interface';
import { RequestState } from '../request_state';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private authData$ = new BehaviorSubject<IAuthData>(null);
  private currentUser$ = new BehaviorSubject<CurrentUser>(null);
  private authState$ = new BehaviorSubject<string>(localStorage.getItem(this.config.storageNaming.state));

  constructor(@Inject(CONFIG) private config: IConfig) { }

  getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated$.next(isAuthenticated);
  }

  getAuthData$(): Observable<IAuthData> {
    return this.authData$.asObservable();
  }

  setAuthData(authData: IAuthData): void {
    this.authData$.next(authData);
  }

  getAuthData(): IAuthData {
    return this.authData$.getValue();
  }

  getCurrentUser$(): Observable<CurrentUser> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(currentUser: CurrentUser): void {
    this.currentUser$.next(currentUser);
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
}
