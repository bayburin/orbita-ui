import { AuthState } from './../store/auth.state';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authState: AuthState) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticated = this.authState.getIsAuthenticated();

    if (isAuthenticated) {
      const clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authState.getAuthData().accessToken}`
        }
      });

      return next.handle(clone);
    }

    return next.handle(request);
  }
}
