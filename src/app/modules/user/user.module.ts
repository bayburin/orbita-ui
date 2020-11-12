import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { USER_FEATURE_KEY, reducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(USER_FEATURE_KEY, reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class Usermodule { }
