import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { claimPrioritiesMap } from '@modules/claim/enums/claim-priorities.enum';
import { UserFacade } from '@modules/user/facades/user.facade';
import { IUserGroup } from '@modules/user/interfaces/user-group.interface';

@Component({
  selector: 'app-preview-new-sd-request',
  templateUrl: './preview-new-sd-request.component.html',
  styleUrls: ['./preview-new-sd-request.component.scss']
})
export class PreviewNewSdRequestComponent implements OnInit {
  priorities = claimPrioritiesMap;
  form = this.data.form;
  userGroups: IUserGroup[];

  get sourceSnapshot() {
    return this.form.source_snapshot;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private userFacade: UserFacade
  ) {
    this.userGroups = this.userFacade.createGroups(this.form.users);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
