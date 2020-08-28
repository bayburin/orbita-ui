import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ClaimRoutingModule } from './claim-routing.module';

import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';
import { ClaimsBlockComponent } from './containers/claims-block/claims-block.component';
import { ClaimsTableComponent } from './components/claims-table/claims-table.component';

@NgModule({
  declarations: [
    ClaimsPageComponent,
    ClaimsBlockComponent,
    ClaimsTableComponent
  ],
  imports: [
    SharedModule,
    ClaimRoutingModule
  ]
})
export class ClaimModule { }
