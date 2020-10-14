import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';
import { ClaimRoutingModule } from './claim-routing.module';

import { CLAIM_FEATURE_KEY, reducer } from './store/reducers/claim.reducer';
import { ClaimEffects } from './store/effects/claim.effects';

import { ClaimsPageComponent } from './pages/claims-page/claims-page.component';
import { ClaimsBlockComponent } from './containers/claims-block/claims-block.component';
import { ClaimsTableComponent } from './components/claims-table/claims-table.component';
import { ClaimWorkflowInfoComponent } from './components/claim-workflow-info/claim-workflow-info.component';

@NgModule({
  declarations: [
    ClaimsPageComponent,
    ClaimsBlockComponent,
    ClaimsTableComponent,
    ClaimWorkflowInfoComponent
  ],
  imports: [
    SharedModule,
    ClaimRoutingModule,
    FlexLayoutModule,
    StoreModule.forFeature(CLAIM_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ClaimEffects])
  ]
})
export class ClaimModule { }
