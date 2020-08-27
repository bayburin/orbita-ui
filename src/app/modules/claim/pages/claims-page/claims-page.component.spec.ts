import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsPageComponent } from './claims-page.component';

describe('ClaimsPageComponent', () => {
  let component: ClaimsPageComponent;
  let fixture: ComponentFixture<ClaimsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
