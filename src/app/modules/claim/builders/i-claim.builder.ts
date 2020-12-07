import { ClaimInterface } from '@modules/claim/types/claim.types';
import { ModelBuilder } from '@shared/builders/model.builder';
import { ClaimStatuses } from '@modules/claim/enums/claim-statuses.enum';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { IRuntimeBuilder } from './i-runtime.builder';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';

export abstract class IClaimBuilder<T extends ClaimInterface> extends ModelBuilder<T> {
  constructor() {
    super();

    this.model = {
      id: null,
      type: null,
      service_id: null,
      app_template_id: null,
      service_name: '',
      app_template_name: '',
      status: ClaimStatuses.OPENED,
      priority: ClaimPriorities.DEFAULT,
      claim_user: { },
      runtime: new IRuntimeBuilder().build(),
      attrs: { },
      rating: null,
      works: []
    } as T;
  }

  testBuild(): T {
    this.model.id = this.model.id || 1;
    this.model.works = this.model.works.length > 0 ? this.model.works : [new IWorkBuilder().testBuild()];
    this.model.runtime = this.model.runtime.created_at ? this.model.runtime : new IRuntimeBuilder().testBuild();

    return this.model;
  }
}
