import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule { }
