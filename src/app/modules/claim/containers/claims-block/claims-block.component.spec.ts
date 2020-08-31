import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBlockComponent } from './claims-block.component';
import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { ClaimFacadeStub } from '@modules/claim/facades/claim.facade.stub';

describe('ClaimsBlockComponent', () => {
  let component: ClaimsBlockComponent;
  let fixture: ComponentFixture<ClaimsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsBlockComponent],
      providers: [{ provide: ClaimFacade, useClass: ClaimFacadeStub }]
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
