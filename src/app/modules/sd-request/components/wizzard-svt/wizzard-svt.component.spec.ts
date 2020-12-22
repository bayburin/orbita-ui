import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MaterialModule } from '@shared/material.module';
import { WizzardSvtComponent } from './wizzard-svt.component';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';

describe('WizzardSvtComponent', () => {
  let component: WizzardSvtComponent;
  let fixture: ComponentFixture<WizzardSvtComponent>;
  let formService: NewSdRequestFormService;
  let form: FormGroup;
  let svtItem: ISvtItem;
  let spy: jasmine.Spy;

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
    form = new FormGroup({
      id_tn: new FormControl(''),
      invent_num: new FormControl(''),
      svt_item_id: new FormControl(null),
      svt_item: new FormControl('')
    });

    fixture = TestBed.createComponent(WizzardSvtComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    component.sourceSnapshotForm = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On changes "searchSvtItem" values', () => {
    beforeEach(() => {
      spy = spyOn(formService, 'searchSvtItems');
    });

    it('should return array of loaded data', (done) => {
      const result = [
        new ISvtItemBuilder().short_item_model('First').testBuild(),
        new ISvtItemBuilder().short_item_model('Second').testBuild()
      ];
      spy.and.returnValue(of(result));

      component.anySvtItems$.subscribe(data => {
        expect(data).toEqual(result);
        done();
      });

      component.searchSvtItem.setValue('test value');
    });

    it('should return empty error if raised any error', (done) => {
      spy.and.callFake(() => throwError({ error: 'Error message' }));

      component.anySvtItems$.subscribe(data => {
        expect(data.length).toEqual(0);
        done();
      });

      component.searchSvtItem.setValue('test value');
    });
  });

  describe('On changes "id_tn" value', () => {
    beforeEach(() => {
      spy = spyOn(formService, 'loadUserSvtItems');
    });

    it('should return array of loaded data', (done) => {
      const result = [new ISvtItemBuilder().testBuild()];
      spy.and.returnValue(of(result));

      component.userSvtItems$.subscribe(data => {
        expect(data).toEqual(result);
        done();
      });

      form.get('id_tn').setValue('test value');
    });

    it('should return empty error if raised any error', (done) => {
      spy.and.callFake(() => throwError({ error: 'Error message' }));

      component.userSvtItems$.subscribe(data => {
        expect(data.length).toEqual(0);
        done();
      });

      form.get('id_tn').setValue('test value');
    });
  });

  describe('On changes "isNoSvtItem" values', () => {
    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      component.selectSvtItem(svtItem);
      component.isNoSvtItem.setValue(true);
    });

    describe('when "isNoSvtItem" enabled', () => {
      it('should disable "searchSvtItem" input', () => {
        expect(component.searchSvtItem.disabled).toBeTrue();
      });

      it('should disable "svtItemList" component', () => {
        expect(component.svtItemList.disabled).toBeTrue();
      });

      it('should set null to svtItem fields of form', () => {
        expect(form.get('invent_num').value).toEqual('');
        expect(form.get('svt_item_id').value).toBeNull();
        expect(form.get('svt_item').value).toEqual('');
      });

      it('should not destroy "selectedSvtItem" FormControl', () => {
        expect(component.selectedSvtItem).toEqual(svtItem);
      });
    });

    describe('when "isNoSvtItem" disabled', () => {
      beforeEach(() => {
        component.isNoSvtItem.setValue(false);
      });

      it('should enable "searchSvtItem" input', () => {
        expect(component.searchSvtItem.disabled).toBeFalse();
      });

      it('should enable "svtItemList" component', () => {
        expect(component.svtItemList.disabled).toBeFalse();
      });

      it('should restore svtItem fields of form if it had been filled once', () => {
        expect(form.get('invent_num').value).toEqual(svtItem.invent_num);
        expect(form.get('svt_item_id').value).toEqual(svtItem.item_id);
        expect(form.get('svt_item').value).toEqual(`${svtItem.type.short_description} ${svtItem.item_model}`);
      });
    });
  });

  describe('#selectSvtItem', () => {
    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      component.selectSvtItem(svtItem);
    });

    it('should set "selectedSvtItem" attribute', () => {
      expect(component.selectedSvtItem).toEqual(svtItem);
    });

    it('should set form attributes from selected item', () => {
      expect(form.get('invent_num').value).toEqual(svtItem.invent_num);
      expect(form.get('svt_item_id').value).toEqual(svtItem.item_id);
      expect(form.get('svt_item').value).toEqual(`${svtItem.type.short_description} ${svtItem.item_model}`);
    });
  });

  describe('#clearSearchSvtItem', () => {
    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      component.selectSvtItem(svtItem);
      component.clearSearchSvtItem();
    });

    it('should set null to "searchSvtItem" attribute', () => {
      expect(component.searchSvtItem.value).toEqual(null);
    });

    it('should set null to svtItem fields of form', () => {
      expect(form.get('invent_num').value).toEqual('');
      expect(form.get('svt_item_id').value).toBeNull();
      expect(form.get('svt_item').value).toEqual('');
    });
  });
});
