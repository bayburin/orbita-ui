import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class WizzardComponent implements OnInit {
  sdRequestForm: FormGroup;

  get sourceSnapshotForm(): FormGroup {
    return this.sdRequestForm.get('source_snapshot') as FormGroup;
  }

  constructor(private formService: NewSdRequestFormService) {}

  ngOnInit(): void {
    this.formService.sdRequestForm$.subscribe(form => {
      this.sdRequestForm = form;
    });
  }

  /**
   * Открыть окно предпросмотра заявки.
   */
  submit(): void {
    this.formService.openPreview();
  }
}
