import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBlockComponent } from './claims-block.component';
import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { ClaimFacadeStub } from '@modules/claim/facades/claim.facade.stub';

describe('ClaimsBlockComponent', () => {
  let component: ClaimsBlockComponent;
  let fixture: ComponentFixture<ClaimsBlockComponent>;
  let claimFacade: ClaimFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsBlockComponent],
      providers: [{ provide: ClaimFacade, useClass: ClaimFacadeStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    claimFacade = TestBed.inject(ClaimFacade);
    fixture = TestBed.createComponent(ClaimsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSelect', () => {
    it('should call "showWorkflow" method', () => {
      const id = 1;
      const spy = spyOn(claimFacade, 'showWorkflow');

      component.onSelect(id);

      expect(spy).toHaveBeenCalledWith(id);
    });
  });
});
