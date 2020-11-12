import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { USER_FEATURE_KEY, reducer } from './store/reducers/user.reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(USER_FEATURE_KEY, reducer),
  ]
})
export class Usermodule { }
