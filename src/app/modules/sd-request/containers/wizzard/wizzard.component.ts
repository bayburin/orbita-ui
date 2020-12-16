import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss']
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
  onSubmit(): void {
    this.formService.openPreview();
  }
}
