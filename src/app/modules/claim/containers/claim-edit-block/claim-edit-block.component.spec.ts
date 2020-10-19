import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEditBlockComponent } from './claim-edit-block.component';

describe('ClaimEditBlockComponent', () => {
  let component: ClaimEditBlockComponent;
  let fixture: ComponentFixture<ClaimEditBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEditBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEditBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
