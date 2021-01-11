import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PreviewNewSdRequestComponent } from './preview-new-sd-request.component';
import { MaterialModule } from '@shared/material.module';
import { UserFacade } from '@modules/user/facades/user.facade';
import { UserFacadeStub } from '@modules/user/facades/user.facade.stub';
import { DatetimePipe } from '@shared/pipes/datetime/datetime.pipe';

describe('PreviewNewSdRequestComponent', () => {
  let component: PreviewNewSdRequestComponent;
  let fixture: ComponentFixture<PreviewNewSdRequestComponent>;
  const form = { attrs: { }, source_snapshot: { }, attachments: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { form } },
        { provide: UserFacade, useClass: UserFacadeStub }
      ],
      declarations: [PreviewNewSdRequestComponent, DatetimePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewNewSdRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
