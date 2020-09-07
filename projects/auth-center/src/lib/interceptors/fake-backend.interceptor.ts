import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { materialize, dematerialize, delay, switchMap, mergeMap } from 'rxjs/operators';

import { CONFIG } from '../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { IAuthData } from './../interfaces/auth-data.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(@Inject(CONFIG) private config: IConfig) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const config = this.config;

    return of(null)
      .pipe(
        mergeMap(handleRequest),
        materialize(),
        delay(1000),
        dematerialize()
      );

    function handleRequest(): Observable<any> {
      switch (true) {
        case request.url === config.serverUrl && request.method === 'POST':
          return authorize();
        default:
          return next.handle(request);
      }
    }

    function authorize(): Observable<any> {
      // const body = {
      //   id_tn: 54_321,
      //   tn: 12_345,
      //   fio: 'Форточкина Клавдия Ивановна',
      //   dept: 714,
      //   auth_data: {
      //     access_token: 'fake-jwt-token',
      //     expired_time: 123456
      //   }
      // };
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const body: IAuthData = { token: fakeToken };

      return of(new HttpResponse({ body, status: 200 }));
    }
  }
}
