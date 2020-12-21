// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
// import { MaterialModule } from '@shared/material.module';
// import { MatDialog } from '@angular/material/dialog';

// import { WizzardComponent } from './wizzard.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { PreviewNewSdRequestComponent } from '@modules/sd-request/components/preview-new-sd-request/preview-new-sd-request.component';
// import { WizzardDescriptionComponent } from '@modules/sd-request/components/wizzard-description/wizzard-description.component';

// fdescribe('WizzardComponent', () => {
//   let component: WizzardComponent;
//   let fixture: ComponentFixture<WizzardComponent>;
//   let dialog: MatDialog;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         MaterialModule,
//         HttpClientTestingModule
//       ],
//       declarations: [WizzardComponent, WizzardDescriptionComponent, PreviewNewSdRequestComponent],
//       providers: [{ provide: AuthHelper, useClass: AuthHelperStub }],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WizzardComponent);
//     component = fixture.componentInstance;
//     // spyOnProperty(component.descriptionEl, 'attachmentsFormEl', 'get').and.returnValue({ attachmentsFormArray: [] });
//     spyOnProperty(component.descriptionEl, 'attachmentsFormEl').and.returnValue({ attachmentsFormArray: [] });
//     dialog = TestBed.inject(MatDialog);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('#submit', () => {
//     // it('should call "save" method of NewSdRequestFormService service', () => {
//     //   const spy = spyOn(formService, 'save');

//     //   component.submit();

//     //   expect(spy).toHaveBeenCalled();
//     // });
//     it('should open PreviewNewSdRequestComponent component with MatDialog', () => {
//       const spy = spyOn(dialog, 'open');

//       expect(spy).toHaveBeenCalledWith(PreviewNewSdRequestComponent, { data: component.sdRequestForm.getRawValue() });
//     });
//   });
// });
