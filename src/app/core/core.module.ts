import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Он должен быть импортирован только в AppModule');
    }
  }
}
