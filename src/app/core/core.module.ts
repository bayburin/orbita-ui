import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@env/environment';
import { SharedModule } from '@shared/shared.module';
import { AuthCenterModule } from 'auth-center';
import { CoreRoutingModule } from './core-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CoreRoutingModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AuthCenterModule.forRoot(environment.auth)
  ],
  exports: [
    HeaderComponent,
    SidenavComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Он должен быть импортирован только в AppModule');
    }
  }
}
