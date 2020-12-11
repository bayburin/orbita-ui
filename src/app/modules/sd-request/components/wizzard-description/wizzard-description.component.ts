import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { FileGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { ITag } from '@shared/interfaces/tag.interface';

@Component({
  selector: 'app-wizzard-description',
  templateUrl: './wizzard-description.component.html',
  styleUrls: ['./wizzard-description.component.scss']
})
export class WizzardDescriptionComponent implements OnInit {
  searchService: FormControl;
  services$: Observable<IService[]>;
  isNoService: FormControl;
  dynamicMatcher = new DynamicErrorStateMatcher();
  avaliableServices$: Observable<IService[]>;
  tags$: Observable<ITag[]>;
  @Input() sdRequestForm: FormGroup;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef;

  get files(): FileGroup[] {
    return this.sdRequestForm.get('attachments').value;
  }

  get tags(): any[] {
    return this.sdRequestForm.get('tags').value;
  }

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchService = this.formService.searchService;
    this.isNoService = this.formService.isNoService;
    this.services$ = this.formService.services$;
    this.tags$ = this.formService.tags$;
  }

  /**
   * Событие выбора услуги у компонента autocomplete
   *
   * @param service - выбранный работник
   */
  selectService(service: IService): void {
    this.formService.service = service;
  }

  /**
   * Выводит наименование услуги в строке option компонента autocomplete.
   *
   * @param service - работник из списка найденных
   */
  displayServiceFn(service: IService): string {
    return service && service.name ? service.name : '';
  }

  /**
   * Очищает компонент autocomplete, указывающее выбранную услугу.
   */
  clearSearchService(): void {
    this.formService.clearSearchService();
  }

  /**
   * Обрабатывает загруженные файлы.
   *
   * @param fileInput - событие выбора файла.
   */
  fileHandler(event: Event): void {
    this.formService.addAttachments((event.target as HTMLInputElement).files);
  }

  /**
   * Обрабатывает файлы, полученные через механизм Drag & Drop.
   *
   * @param files - список полученных файлов.
   */
  onFileDropped(files: FileList): void {
    this.formService.addAttachments(files);
  }

  /**
   * Удаляет файл из списка.
   *
   * @param file - удаляемый файл
   */
  deleteFile(file: File): void {
    this.formService.removeAttachment(file);
  }

  // /**
  //  * Добавляет тег в список выбранных.
  //  *
  //  * @param event - событие выбора тега.
  //  */
  // addTag(event: MatChipInputEvent): void {
  //   const value = event.value;
  //   const tagsForm = this.sdRequestForm.get('tags') as FormControl;
  //   const currentArr = tagsForm.value.slice();

  //   this.tagInput.nativeElement.value = '';

  //   tagsForm.setValue([...currentArr, value]);
  // }

  // selectTag(tag) {
  //   const tagsForm = this.sdRequestForm.get('tags') as FormControl;
  //   const currentArr = tagsForm.value.slice();

  //   this.tagInput.nativeElement.value = '';

  //   tagsForm.setValue([...currentArr, tag]);
  // }
}
