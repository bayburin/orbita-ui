import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { EMPLOYEE_FEATURE_KEY, reducer } from './store/employee.reducer';
import { EmployeeEffects } from './store/employee.effects';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    StoreModule.forFeature(EMPLOYEE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([EmployeeEffects])
  ],
  declarations: [EmployeesPageComponent]
})
export class EmployeeModule { }
