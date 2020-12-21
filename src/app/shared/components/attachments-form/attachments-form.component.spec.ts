import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/material.module';
import { AttachmentsFormComponent } from './attachments-form.component';

describe('AttachmentsFormComponent', () => {
  let component: AttachmentsFormComponent;
  let fixture: ComponentFixture<AttachmentsFormComponent>;
  let file: File;
  let fileList: FileList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [AttachmentsFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    file = new File([new Blob()], 'image.png');
    fileList = {
      0: file,
      length: 1,
      item: (index: number) => file
    };

    fixture = TestBed.createComponent(AttachmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init FormArray', () => {
    expect(component.attachmentsFormArray.value.length).toEqual(0);
  });

  describe('#fileHandler', () => {
    it('should add files to form', () => {
      const event = new Event('change');

      Object.defineProperty(event, 'target', { value: { files: fileList } });
      component.fileHandler(event);

      expect(component.attachmentsFormArray.value.length).toEqual(1);
    });
  });

  describe('#onFileDropped', () => {
    it('should add files to form', () => {
      component.onFileDropped(fileList);

      expect(component.attachmentsFormArray.value.length).toEqual(1);
    });
  });

  describe('#deleteFile', () => {
    it('should delete received file from "attachmentsFormArray" FormArray', () => {
      component.onFileDropped(fileList);
      component.deleteFile(file);

      expect(component.attachmentsFormArray.value.length).toEqual(0);
    });
  });
});
