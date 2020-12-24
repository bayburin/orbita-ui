import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizzardWorkersComponent } from './wizzard-workers.component';

describe('WizzardWorkersComponent', () => {
  let component: WizzardWorkersComponent;
  let fixture: ComponentFixture<WizzardWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizzardWorkersComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
