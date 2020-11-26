import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewSdRequestPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdRequestRoutingModule { }
