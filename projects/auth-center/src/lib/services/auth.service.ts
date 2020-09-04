import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CONFIG } from '../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { RequestState } from './../request_state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) private config: IConfig
  ) { }

  redirectToAuthorizationServer(): void {
    const queryParams = {
      client_id: this.config.clientId,
      response_type: this.config.responseType,
      state: RequestState.generateCode(),
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope
    };
    const params = Object.entries(queryParams).map(([key, val]) => `${key}=${val}`).join('&');
    const url = `${this.config.authorizationServer}?${params}`;

    window.open(url, '_self');
  }

  getAuthData(): Observable<IAuthData> {
    return this.http.get<IAuthData>('test');
  }
}
