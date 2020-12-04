import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WizzardComponent } from './wizzard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';

describe('WizzardComponent', () => {
  let component: WizzardComponent;
  let fixture: ComponentFixture<WizzardComponent>;
  let formService: NewSdRequestFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [WizzardComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSubmit', () => {
    it('should call "save" method of NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'save');

      component.onSubmit();

      expect(spy).toHaveBeenCalled();
    });
  });
});
