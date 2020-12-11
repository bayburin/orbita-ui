import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@shared/material.module';
import { WizzardDescriptionComponent } from './wizzard-description.component';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';

describe('WizzardDescriptionComponent', () => {
  let component: WizzardDescriptionComponent;
  let fixture: ComponentFixture<WizzardDescriptionComponent>;
  let formService: NewSdRequestFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [WizzardDescriptionComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardDescriptionComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    component.sdRequestForm = (formService as any).sdRequestForm.getValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#selectService', () => {
    it('should call "service" setter for NewSdRequestFormService service', () => {
      const service = new IServiceBuilder().testBuild();
      const spy = spyOnProperty(formService, 'service', 'set');

      component.selectService(service);

      expect(spy).toHaveBeenCalledWith(service);
    });
  });

  describe('#displayServiceFn', () => {
    it('should return "name" attribute of service', () => {
      const service = new IServiceBuilder().testBuild();

      expect(component.displayServiceFn(service)).toEqual(service.name);
    });

    it('should return empty string if employee is null', () => {
      expect(component.displayServiceFn(null)).toEqual('');
    });
  });

  describe('#clearSearchService', () => {
    it('should call empty "clearSearchService" method for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'clearSearchService');

      component.clearSearchService();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#fileHandler', () => {
    it('should call "addAttachments" method for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'addAttachments');
      const event = new Event('change');

      Object.defineProperty(event, 'target', { value: '' });
      component.fileHandler(event);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#onFileDropped', () => {
    it('should call "addAttachments" method for NewSdRequestFormService service', () => {
      const file = new File([new Blob()], 'image.png');
      const fileList = {
        0: file,
        length: 1,
        item: (index: number) => file
      };
      const spy = spyOn(formService, 'addAttachments');

      component.onFileDropped(fileList);

      expect(spy).toHaveBeenCalledWith(fileList);
    });
  });

  describe('#deleteFile', () => {
    it('should call "removeAttachment" method for NewSdRequestFormService service', () => {
      const file = new File([new Blob()], 'test.png');
      const spy = spyOn(formService, 'removeAttachment');

      component.deleteFile(file);

      expect(spy).toHaveBeenCalledWith(file);
    });
  });
});
