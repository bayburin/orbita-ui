import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthCenterGuard } from '@iss/ng-auth-center';

import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPageComponent,
    canActivate: [AuthCenterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
