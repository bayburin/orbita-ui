import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

import { AuthStateGuard } from './guards/auth-state/auth-state.guard';

const routes: Routes = [
  {
    path: 'oauth2/callback',
    component: CallbackPageComponent,
    canActivate: [AuthStateGuard]
  },
  {
    path: 'oauth2/authorize_forbidden',
    component: AuthorizeForbiddenPageComponent
  },
  {
    path: 'oauth2/unauthorized',
    component: UnauthorizedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthCenterRoutingModule { }
