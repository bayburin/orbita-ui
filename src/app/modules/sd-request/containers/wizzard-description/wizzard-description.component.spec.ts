
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';

import { MaterialModule } from '@shared/material.module';
import { WizzardDescriptionComponent } from './wizzard-description.component';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceFacade } from '@modules/sd-request/facades/service.facade';
import { ServiceFacadeStub } from '@modules/sd-request/facades/service.facade.stub';

describe('WizzardDescriptionComponent', () => {
  let component: WizzardDescriptionComponent;
  let fixture: ComponentFixture<WizzardDescriptionComponent>;
  let serviceFacade: ServiceFacade;
  let form: FormGroup;
  let services: IService[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [WizzardDescriptionComponent],
      providers: [{ provide: ServiceFacade, useClass: ServiceFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    form = new FormGroup({
      service_id: new FormControl(''),
      service_name: new FormControl(''),
      attrs: new FormGroup({ description: new FormControl('') })
    });
    fixture = TestBed.createComponent(WizzardDescriptionComponent);
    component = fixture.componentInstance;
    serviceFacade = TestBed.inject(ServiceFacade);
    component.sdRequestForm = form;
    services = [
      new IServiceBuilder().name('First').testBuild(),
      new IServiceBuilder().name('Second').testBuild()
    ];
    serviceFacade.services$ = of(services);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save loaded services into avaliableServices$ attribute', () => {
    component.avaliableServices$.subscribe(data => {
      expect(data).toEqual(services);
    });
  });

  describe('On changes "searchService" values', () => {
    it('should return filtered array of services', (done) => {
      component.services$.pipe(skip(1)).subscribe(data => {
        expect(data).toEqual([services[0]]);
        done();
      });

      component.searchService.setValue('first');
    });
  });

  describe('On changes "isNoService" values', () => {
    let service: IService;

    beforeEach(() => {
      service = services[0];
      component.selectService(service);
      component.isNoService.setValue(true);
    });

    describe('when "isNoService" enabled', () => {
      it('should disable "searchService" input', () => {
        expect(component.searchService.disabled).toBeTrue();
      });

      it('should set null to svtItem fields of form', () => {
        expect(form.get('service_id').value).toBeNull();
        expect(form.get('service_name').value).toEqual('');
      });

      it('should not destroy "selectedService" FormControl', () => {
        expect(component.selectedService).toEqual(service);
      });
    });

    describe('when "isNoService" disabled', () => {
      beforeEach(() => {
        component.isNoService.setValue(false);
      });

      it('should enable "searchService" input', () => {
        expect(component.searchService.disabled).toBeFalse();
      });

      it('should restore svtItem fields of form if it had been filled once', () => {
        expect(form.get('service_id').value).toEqual(service.id);
        expect(form.get('service_name').value).toEqual(service.name);
      });
    });
  });

  describe('#selectService', () => {
    let service: IService;

    beforeEach(() => {
      service = new IServiceBuilder().testBuild();
      component.selectService(service);
    });

    it('should set "selectedService" attribute', () => {
      expect(component.selectedService).toEqual(service);
    });

    it('should set form attributes from selected service', () => {
      expect(form.get('service_id').value).toEqual(service.id);
      expect(form.get('service_name').value).toEqual(service.name);
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
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component, 'clearSearchService');
      component.clearSearchService();
    });

    it('should set null to "searchService" attribute', () => {
      expect(component.searchService.value).toEqual(null);
    });

    it('should call "selectService" method with null value', () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
