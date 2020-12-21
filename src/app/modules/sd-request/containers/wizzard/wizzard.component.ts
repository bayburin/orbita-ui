import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthHelper } from '@iss/ng-auth-center';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { WizzardDescriptionComponent } from '@modules/sd-request/components/wizzard-description/wizzard-description.component';
import { PreviewNewSdRequestComponent } from '@modules/sd-request/components/preview-new-sd-request/preview-new-sd-request.component';

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
  @ViewChild(WizzardDescriptionComponent, { static: true }) descriptionEl: WizzardDescriptionComponent;

  get sourceSnapshotForm(): FormGroup {
    return this.sdRequestForm.get('source_snapshot') as FormGroup;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authHelper: AuthHelper,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sdRequestForm = this.formBuilder.group({
      service_id: [''],
      service_name: [''],
      priority: [ClaimPriorities.DEFAULT, Validators.required],
      finished_at_plan: [moment(), Validators.required],
      comment: [''],
      attrs: this.formBuilder.group({
        description: ['', Validators.required]
      }),
      source_snapshot: this.formBuilder.group({
        id_tn: [null],
        tn: [null, Validators.required],
        fio: ['', Validators.required],
        dept: ['', Validators.required],
        email: [''],
        tel: [''],
        mobile: [''],
        invent_num: [''],
        svt_item_id: [null],
        svt_item: ['']
      }),
      attachments: this.descriptionEl.attachmentsFormEl.attachmentsFormArray,
      tags: [[{ name: 'свободная_заявка' }]],
      users: [[this.authHelper.getJwtPayload()]],
    });

    // TODO: Удалить
    this.sdRequestForm.valueChanges.subscribe(data => console.log(data));
  }

  /**
   * Открыть окно предпросмотра заявки.
   */
  submit(): void {
    const dialogRef = this.dialog.open(PreviewNewSdRequestComponent, {
      data: {
        form: this.sdRequestForm.getRawValue()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
