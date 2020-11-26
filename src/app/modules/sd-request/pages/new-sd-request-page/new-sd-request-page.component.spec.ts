import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSdRequestPageComponent } from './new-sd-request-page.component';

describe('NewSdRequestPageComponent', () => {
  let component: NewSdRequestPageComponent;
  let fixture: ComponentFixture<NewSdRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSdRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
