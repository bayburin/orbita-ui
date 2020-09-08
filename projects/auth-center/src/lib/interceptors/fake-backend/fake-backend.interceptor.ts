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

import { CONFIG } from '../../auth-center.config';
import { IConfig } from './../../interfaces/config.interface';
import { IAuthData } from './../../interfaces/auth-data.interface';

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
      //   dept: 714,W
      //   auth_data: {
      //     access_token: 'fake-jwt-token',
      //     expired_time: 123456
      //   }
      // };
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90biI6IjU0XzMyMSIsInRuIjoiMTJfMzQ1IiwiZmlvIjoi0KTQvtGA0YLQvtGH0LrQuNC90LAg0JrQu9Cw0LLQtNC40Y8g0JjQstCw0L3QvtCy0L3QsCIsImRlcHQiOiI3MTQiLCJhdXRoX2RhdGEiOnsiYWNjZXNzX3Rva2VuIjoiZmFrZS1qd3QtdG9rZW4iLCJleHBpcmVkX3RpbWUiOiIxMjM0NTYifX0.hgX_W-hO-XKuHGicwuzg2e0cxI8wT0fSSmTCTkAs6h4';
      const body: IAuthData = { token: fakeToken };

      return of(new HttpResponse({ body, status: 200 }));
    }
  }
}
