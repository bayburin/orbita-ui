import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNewSdRequestComponent } from './preview-new-sd-request.component';

describe('PreviewNewSdRequestComponent', () => {
  let component: PreviewNewSdRequestComponent;
  let fixture: ComponentFixture<PreviewNewSdRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewNewSdRequestComponent ]
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
