import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

import { AuthCenterRoutingModule } from './auth-center-routing.module';

import { CONFIG, defaultConfig } from './auth-center.config';
import { IConfig } from './interfaces/config.interface';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { AuthState } from './store/auth.state';
import { jwtOptionsFactory } from './factories/jwt-options.factory';

@NgModule({
  declarations: [
    CallbackPageComponent,
    AuthorizeForbiddenPageComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    AuthCenterRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthState]
      }
    })
  ],
  exports: []
})
export class AuthCenterModule {
  static forRoot(config: IConfig): ModuleWithProviders<AuthCenterModule> {
    return {
      ngModule: AuthCenterModule,
      providers: [
        { provide: CONFIG, useValue: { ...defaultConfig, ...config } },
        { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
      ]
    };
  }
}
