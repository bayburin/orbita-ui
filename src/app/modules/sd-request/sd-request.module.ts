import { NgModule } from '@angular/core';
import { SdRequestRoutingModule } from './sd-request-routing.module';

import { SharedModule } from '@shared/shared.module';
import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';
import { WizzardComponent } from './containers/wizzard/wizzard.component';

@NgModule({
  imports: [
    SharedModule,
    SdRequestRoutingModule
  ],
  declarations: [NewSdRequestPageComponent, WizzardComponent]
})
export class SdRequestModule { }
