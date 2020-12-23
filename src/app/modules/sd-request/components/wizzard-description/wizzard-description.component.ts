import { startWith, filter, mergeMap, map, catchError } from 'rxjs/operators';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { ITag } from '@shared/interfaces/tag.interface';
import { AttachmentsFormComponent } from '@shared/components/attachments-form/attachments-form.component';

@Component({
  selector: 'app-wizzard-description',
  templateUrl: './wizzard-description.component.html',
  styleUrls: ['./wizzard-description.component.scss']
})
export class WizzardDescriptionComponent implements OnInit {
  searchService: FormControl = new FormControl();
  services$: Observable<IService[]>;
  isNoService: FormControl = new FormControl(false);
  selectedService: IService;
  dynamicMatcher = new DynamicErrorStateMatcher();
  avaliableServices$: Observable<IService[]>;
  tags$: Observable<ITag[]>;
  @Input() sdRequestForm: FormGroup;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef;
  @ViewChild(AttachmentsFormComponent, { static: true }) attachmentsFormEl: AttachmentsFormComponent;

  get tags(): any[] {
    return this.sdRequestForm.get('tags').value;
  }

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.loadServices();
    this.searchServices();
    this.processingIsNoService();
  }

  /**
   * Событие выбора услуги у компонента autocomplete
   *
   * @param service - выбранный работник
   */
  selectService(service: IService): void {
    this.selectedService = service;
    this.updateServiceForm(service);
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
    this.searchService.setValue(null);
    this.selectService(null);
  }

  private loadServices(): void {
    this.avaliableServices$ = this.formService.loadServices()
      .pipe((catchError(error => {
        console.log(error);
        this.searchService.setErrors({ serverError: true});

        return of([]);
      }))
    );
  }

  /**
   * Подписывается на поле поиска услуги и фильтрует список услуг.
   */
  private searchServices(): void {
    this.services$ = this.searchService.valueChanges.pipe(
      startWith(''),
      filter(term => typeof term === 'string'),
      mergeMap(term => {
        return this.avaliableServices$.pipe(map(services => {
          if (!term) {
            return services;
          }

          return services.filter(service => service.name.toLowerCase().includes(term.toLowerCase()));
        }));
      })
    );
  }

  /**
   * Подписывается на поле "isNoService" и по результатам активирует/отключает поле "searchService".
   */
  private processingIsNoService(): void {
    this.isNoService.valueChanges.subscribe(isNoService => {
      if (isNoService) {
        this.searchService.disable();
        this.updateServiceForm(null);
      } else {
        this.searchService.enable();
        this.selectService(this.selectedService);
      }
    });
  }

  /**
   * Обновляет поля формы, связанные с выбранной услугой.
   *
   * @param service - выбранная услуга.
   */
  private updateServiceForm(service: IService): void {
    this.sdRequestForm.patchValue({
      service_id: service?.id || null,
      service_name: service?.name || ''
    });
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
