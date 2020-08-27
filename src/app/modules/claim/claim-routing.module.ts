import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';

const routes: Routes = [
  {
    path: 'claims',
    component: ClaimsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
