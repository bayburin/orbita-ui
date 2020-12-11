import { NgModule } from '@angular/core';
import { SdRequestRoutingModule } from './sd-request-routing.module';

import { SharedModule } from '@shared/shared.module';
import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';
import { WizzardComponent } from './containers/wizzard/wizzard.component';
import { WizzardUserInfoComponent } from './components/wizzard-user-info/wizzard-user-info.component';
import { WizzardDescriptionComponent } from './components/wizzard-description/wizzard-description.component';
import { WizzardSvtComponent } from './components/wizzard-svt/wizzard-svt.component';

@NgModule({
  imports: [
    SharedModule,
    SdRequestRoutingModule
  ],
  declarations: [
    NewSdRequestPageComponent,
    WizzardComponent,
    WizzardUserInfoComponent,
    WizzardDescriptionComponent,
    WizzardSvtComponent
  ]
})
export class SdRequestModule { }
