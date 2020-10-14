import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { DatetimePipe } from './pipes/datetime/datetime.pipe';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
];

const declarations: any[] = [
  DatetimePipe
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...declarations],
  declarations: [...declarations]
})
export class SharedModule { }
