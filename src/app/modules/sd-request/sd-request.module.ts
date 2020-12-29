import { NgModule } from '@angular/core';
import { SdRequestRoutingModule } from './sd-request-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { SERVICE_FEATURE_KEY, reducer } from './store/service.reducer';
import { ServiceEffects } from './store/service.effects';

import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';
import { WizzardComponent } from './containers/wizzard/wizzard.component';
import { WizzardEmployeeInfoComponent } from './components/wizzard-employee-info/wizzard-employee-info.component';
import { WizzardDescriptionComponent } from './containers/wizzard-description/wizzard-description.component';
import { WizzardSvtComponent } from './components/wizzard-svt/wizzard-svt.component';
// import { WizzardWorkersComponent } from './components/wizzard-workers/wizzard-workers.component';
import { WizzardAdditionalComponent } from './components/wizzard-additional/wizzard-additional.component';
import { PreviewNewSdRequestComponent } from './components/preview-new-sd-request/preview-new-sd-request.component';

@NgModule({
  imports: [
    SharedModule,
    SdRequestRoutingModule,
    StoreModule.forFeature(SERVICE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ServiceEffects])
  ],
  declarations: [
    NewSdRequestPageComponent,
    WizzardComponent,
    WizzardEmployeeInfoComponent,
    WizzardDescriptionComponent,
    WizzardSvtComponent,
    // WizzardWorkersComponent,
    WizzardAdditionalComponent,
    PreviewNewSdRequestComponent
  ]
})
export class SdRequestModule { }
