import { NgModule } from '@angular/core';

import { CallbackPageComponent } from './pages/callback/callback-page.component';

import { AuthCenterRoutingModule } from './auth-center-routing.module';

@NgModule({
  declarations: [CallbackPageComponent],
  imports: [AuthCenterRoutingModule],
  exports: []
})
export class AuthCenterModule { }
