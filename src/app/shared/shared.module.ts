import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { DatetimePipe } from './pipes/datetime/datetime.pipe';
import { MiddleNamePipe } from './pipes/middle-name/middle-name.pipe';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule
];

const declarations: any[] = [
  DatetimePipe,
  MiddleNamePipe
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...declarations],
  declarations: [...declarations]
})
export class SharedModule { }
