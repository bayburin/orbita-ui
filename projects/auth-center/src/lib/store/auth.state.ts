import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CurrentUser } from '../models/current_user.model';
import { CONFIG } from '../auth-center.config';
import { IConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private authData$ = new BehaviorSubject<IAuthData>(null);
  private currentUser$ = new BehaviorSubject<CurrentUser>(null);
  private authState$ = new BehaviorSubject<string>(null);

  constructor(@Inject(CONFIG) private config: IConfig) { }

  getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
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

  getCurrentUser$(): Observable<CurrentUser> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(currentUser: CurrentUser): void {
    this.currentUser$.next(currentUser);
  }

  getAuthState$(): Observable<string> {
    return this.authState$.asObservable();
  }

  setAuthState(authState: string): void {
    localStorage.setItem(this.config.storageNaming.state, authState);
    this.authState$.next(authState);
  }
}
