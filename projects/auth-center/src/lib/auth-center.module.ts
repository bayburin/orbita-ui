import { NgModule, ModuleWithProviders } from '@angular/core';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';

import { AuthCenterRoutingModule } from './auth-center-routing.module';
import { CONFIG, defaultConfig } from './auth-center.config';
import { IConfig } from './interfaces/config.interface';

@NgModule({
  declarations: [
    CallbackPageComponent,
    AuthorizeForbiddenPageComponent
  ],
  imports: [AuthCenterRoutingModule],
  exports: []
})
export class AuthCenterModule {
  static forRoot(config: IConfig): ModuleWithProviders<AuthCenterModule> {
    return {
      ngModule: AuthCenterModule,
      providers: [{ provide: CONFIG, useValue: { ...defaultConfig, ...config } }]
    };
  }
}
