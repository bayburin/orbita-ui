import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FileGroup {
  file: File;
  data: string | ArrayBuffer;
}

@Component({
  selector: 'app-attachments-form',
  templateUrl: './attachments-form.component.html',
  styleUrls: ['./attachments-form.component.scss']
})
export class AttachmentsFormComponent {
  attachmentsFormArray: FormArray = this.formBuilder.array([]);

  constructor(private formBuilder: FormBuilder) { }

  /**
   * Обрабатывает загруженные файлы.
   *
   * @param fileInput - событие выбора файла.
   */
  fileHandler(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    this.addAttachments(files);
  }

  /**
   * Обрабатывает файлы, полученные через механизм Drag & Drop.
   *
   * @param files - список полученных файлов.
   */
  onFileDropped(files: FileList): void {
    this.addAttachments(files);
  }

  /**
   * Удаляет файл из списка.
   *
   * @param file - удаляемый файл
   */
  deleteFile(file: File): void {
    this.attachmentsFormArray.removeAt(this.attachmentsFormArray.value.findIndex((attachment: FileGroup) => attachment.file === file ));
  }

  /**
   * Добавляет указанные файлы к форме.
   *
   * @param files - массив файлов
   */
  private addAttachments(files: FileList): void {
    for (const file of Array.from(files)) {
      this.attachmentsFormArray.push(this.createAttachment(file));
    }
  }

  /**
   * Создает элемент формы attachment.
   *
   * @param file - переданный в форму файл
   */
  private createAttachment(file: File): FormGroup {
    const fileGroup = this.formBuilder.group({
      file: [file],
      data: []
    });

    this.convertToBase64(file).subscribe(data => fileGroup.patchValue({ data }));

    return fileGroup;
  }

  /**
   * Конвертирует файл в base64.
   *
   * @param file - преоразуемый файл.
   */
  private convertToBase64(file: File): Observable<string | ArrayBuffer> {
    return new Observable(subscriber => {
      const reader = new FileReader();

      reader.onload = () => {
        subscriber.next(reader.result);
        subscriber.complete();
      };
      reader.readAsDataURL(file);
    });
  }
}
