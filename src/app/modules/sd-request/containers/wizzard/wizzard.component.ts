import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { WizzardUserInfoComponent } from '@modules/sd-request/components/wizzard-user-info/wizzard-user-info.component';

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss']
})
export class WizzardComponent implements OnInit {
  searchEmployee: FormControl;
  sdRequestForm: FormGroup;
  employees$: Observable<IBaseEmployee[]>;
  @ViewChild(WizzardUserInfoComponent) userInfoComponent: WizzardUserInfoComponent;

  get form() {
    return this.sdRequestForm.controls;
  }

  get sourceSnapshotForm(): FormGroup {
    return this.form.source_snapshot as FormGroup;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sdRequestForm = this.formBuilder.group({
      service_id: [''],
      service_name: [''],
      attrs: this.formBuilder.group({
        description: ['', Validators.required]
      }),
      source_snapshot: this.formBuilder.group({
        id_tn: [''],
        tn: ['', Validators.required],
        fio: ['', Validators.required],
        dept: ['', Validators.required],
        email: [''],
        tel: [''],
        mobile: ['']
      }),
    });
  }

  /**
   * Сохраняет форму
   */
  onSubmit(): void {
    console.log(this.sdRequestForm.getRawValue());
  }
}
