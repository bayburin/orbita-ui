import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallbackPageComponent } from './pages/callback/callback-page.component';

const routes: Routes = [
  {
    path: 'oauth2/callback',
    component: CallbackPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthCenterRoutingModule { }
