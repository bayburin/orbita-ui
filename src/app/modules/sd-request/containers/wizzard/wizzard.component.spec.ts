import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { MaterialModule } from '@shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { WizzardComponent } from './wizzard.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PreviewNewSdRequestComponent } from '@modules/sd-request/components/preview-new-sd-request/preview-new-sd-request.component';
import { WizzardDescriptionComponent } from '@modules/sd-request/containers/wizzard-description/wizzard-description.component';

@Component({
  selector: 'app-wizzard-description',
  template: '<div></div>'
})
class WizzardDescriptionComponentStub {
  @Input() sdRequestForm: FormGroup;
}

describe('WizzardComponent', () => {
  let component: WizzardComponent;
  let fixture: ComponentFixture<WizzardComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [WizzardComponent, WizzardDescriptionComponentStub, PreviewNewSdRequestComponent],
      providers: [{ provide: AuthHelper, useClass: AuthHelperStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardComponent);
    component = fixture.componentInstance;
    const stubDescriptionComponent = jasmine.createSpyObj('WizzardDescriptionComponent', ['attachmentsFormEl']);
    const stubWorkersFormComponent = jasmine.createSpyObj('WorkersFormComponent', ['workers']);
    const stubDescriptionProxy = new Proxy(stubDescriptionComponent, {
      get(target, prop) {
        if (prop === 'attachmentsFormEl') {
          return [];
        }
      }
    });
    const stubWorkersFormProxy = new Proxy(stubWorkersFormComponent, {
      get(target, prop) {
        if (prop === 'workers') {
          return [];
        }
      }
    });
    component.descriptionEl = stubDescriptionProxy;
    component.workersEl = stubWorkersFormProxy;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create sdRequestForm FormGroup', () => {
    expect(component.sdRequestForm).toBeInstanceOf(FormGroup);
  });

  describe('#submit', () => {
    it('should open PreviewNewSdRequestComponent component with MatDialog', () => {
      const spy = spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);

      component.submit();

      expect(spy).toHaveBeenCalledWith(PreviewNewSdRequestComponent, { data: { form: component.sdRequestForm.getRawValue() } });
    });
  });
});
