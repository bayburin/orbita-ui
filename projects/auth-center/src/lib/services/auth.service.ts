import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { CONFIG } from '../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { RequestState } from '../request_state';

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
      redirect_uri: this.config.redirectUrl,
      scope: this.config.scope
    };
    const paramsString = Object.entries(paramsObject).map(([key, val]) => `${key}=${val}`).join('&');
    const url = `${this.config.authorizationServer}?${paramsString}`;

    window.open(url, '_self');
  }

  getJwt(params: Params): Observable<{ token: string }> {
    const body = { code: params.code };

    return this.http.post<{ token: string }>(this.config.serverUrl, body);
  }
}
