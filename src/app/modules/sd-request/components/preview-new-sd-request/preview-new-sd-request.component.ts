import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-new-sd-request',
  templateUrl: './preview-new-sd-request.component.html',
  styleUrls: ['./preview-new-sd-request.component.scss']
})
export class PreviewNewSdRequestComponent implements OnInit {
  form = this.data.form;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { form: any }) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}
