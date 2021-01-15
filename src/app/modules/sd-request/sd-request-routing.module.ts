import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthCenterGuard } from '@iss/ng-auth-center';

import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewSdRequestPageComponent,
    canActivate: [AuthCenterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdRequestRoutingModule { }
