import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@shared/material.module';
import { WizzardSvtComponent } from './wizzard-svt.component';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';

describe('WizzardSvtComponent', () => {
  let component: WizzardSvtComponent;
  let fixture: ComponentFixture<WizzardSvtComponent>;
  let formService: NewSdRequestFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [WizzardSvtComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardSvtComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    component.sourceSnapshotForm = (formService as any).sdRequestForm.getValue().get('source_snapshot');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#selectSvtItem', () => {
    it('should call "svtItem" setter for NewSdRequestFormService service', () => {
      const svtItem = new ISvtItemBuilder().build();
      const spy = spyOnProperty(formService, 'svtItem', 'set');

      component.selectSvtItem(svtItem);

      expect(spy).toHaveBeenCalledWith(svtItem);
    });
  });

  describe('#clearSearchSvtItem', () => {
    it('should call empty "clearSearchSvtItem" method for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'clearSearchSvtItem');

      component.clearSearchSvtItem();

      expect(spy).toHaveBeenCalled();
    });
  });
});
