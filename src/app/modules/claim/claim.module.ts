import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';

@NgModule({
  declarations: [ClaimsPageComponent],
  imports: [
    SharedModule,
    ClaimRoutingModule
  ]
})
export class ClaimModule { }
