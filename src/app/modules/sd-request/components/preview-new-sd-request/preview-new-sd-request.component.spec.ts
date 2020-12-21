import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PreviewNewSdRequestComponent } from './preview-new-sd-request.component';
import { MaterialModule } from '@shared/material.module';

describe('PreviewNewSdRequestComponent', () => {
  let component: PreviewNewSdRequestComponent;
  let fixture: ComponentFixture<PreviewNewSdRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [PreviewNewSdRequestComponent]
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
