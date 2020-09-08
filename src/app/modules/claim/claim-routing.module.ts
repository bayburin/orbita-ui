import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCenterGuard } from 'auth-center';

import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimsPageComponent,
    canActivate: [AuthCenterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
