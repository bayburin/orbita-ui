import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

import { AuthCenterRoutingModule } from './auth-center-routing.module';

import { CONFIG, defaultConfig } from './auth-center.config';
import { IConfig } from './interfaces/config.interface';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';

@NgModule({
  declarations: [
    CallbackPageComponent,
    AuthorizeForbiddenPageComponent,
    UnauthorizedPageComponent
  ],
  imports: [AuthCenterRoutingModule],
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
