import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthData } from './../interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  redirectToAuthorizePage(): void {
    const authCenterUri = 'https://auth-center.iss-reshetnev.ru/oauth/authorize';
    const queryParams = `?client_id=83&response_type=code&state=''&redirect_uri=https://localhost.iss-reshetnev.ru:4200/oauth2/callback&scope=`;
    const authorizeUri = authCenterUri + queryParams;

    window.open(authorizeUri, '_self');
  }

  getAuthData(): Observable<IAuthData> {
    return this.http.get<IAuthData>('test');
  }
}
