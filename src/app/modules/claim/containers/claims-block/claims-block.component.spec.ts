import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBlockComponent } from './claims-block.component';

describe('ClaimsBlockComponent', () => {
  let component: ClaimsBlockComponent;
  let fixture: ComponentFixture<ClaimsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
