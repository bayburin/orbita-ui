import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCenterGuard } from '@iss/ng-auth-center';

import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';
import { ClaimPageComponent } from './pages/claim-page/claim-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimsPageComponent,
    canActivate: [AuthCenterGuard]
  },
  {
    path: ':id',
    component: ClaimPageComponent,
    canActivate: [AuthCenterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
