import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CONFIG } from '../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { RequestState } from '../request_state';
import { ICurrentUser } from './../interfaces/current_user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) private config: IConfig
  ) { }

  redirectToAuthorizationServer(state: RequestState): void {
    const paramsObject = {
      client_id: this.config.clientId,
      response_type: this.config.responseType,
      state: state.value,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope
    };
    const paramsString = Object.entries(paramsObject).map(([key, val]) => `${key}=${val}`).join('&');
    const url = `${this.config.authorizationServer}?${paramsString}`;

    window.open(url, '_self');
  }

  // getAuthData(): Observable<IAuthData> {
  //   return this.http.get<IAuthData>(this.config.apiServer);
  // }

  authorize(params: Params): Observable<ICurrentUser> {
    const body = { code: params.code };

    return this.http.post<ICurrentUser>(this.config.apiServer, body);
  }

  // getUserData(): Observable<IAuthData> {
  //   return this.http.get(this.);
  // }
}
