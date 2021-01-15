import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NewSdRequestFormService } from './new-sd-request-form.service';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from '@modules/sd-request/api/service-desk/service-desk.api.stub';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { SvtApiStub } from '@modules/sd-request/api/svt/svt.api.stub';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';

describe('NewSdRequestFormService', () => {
  let service: NewSdRequestFormService;
  let svtApi: SvtApi;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FormBuilder,
        { provide: ServiceDeskApi, useClass: ServiceDeskApiStub },
        { provide: SvtApi, useClass: SvtApiStub }
      ]
    });

    service = TestBed.inject(NewSdRequestFormService);
    svtApi = TestBed.inject(SvtApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#save', () => {
    it('should save form', () => {
      // TODO: Сделать тест
    });
  });

  describe('#searchSvtItems', () => {
    let svtItem: ISvtItem;

    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      spy = spyOn(svtApi, 'getAnyItems').and.returnValue(of([svtItem]));
    });

    it('should call "getAnyItems" method', () => {
      service.searchSvtItems('invent_num').subscribe(() => {
        expect(spy).toHaveBeenCalledWith('invent_num');
      });
    });

    it('should return data from "getAnyItems" method', () => {
      service.searchSvtItems('invent_num').subscribe(data => {
        expect(data).toEqual([svtItem]);
      });
    });
  });

  describe('#loadUserSvtItems', () => {
    let svtItem: ISvtItem;

    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      spy = spyOn(svtApi, 'getUserItems').and.returnValue(of([svtItem]));
    });

    it('should call "getUserItems" method', () => {
      service.loadUserSvtItems(123).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(123);
      });
    });

    it('should return data from "getUserItems" method', () => {
      service.loadUserSvtItems(123).subscribe(data => {
        expect(data).toEqual([svtItem]);
      });
    });
  });
});
