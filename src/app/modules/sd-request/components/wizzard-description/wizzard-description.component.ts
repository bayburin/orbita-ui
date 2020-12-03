import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { catchError, startWith, map, mergeMap, tap, filter } from 'rxjs/operators';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { IService } from '@modules/sd-request/interfaces/service.interface';

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
  serviceList$: Observable<IService[]>;
  @Input() sdRequestForm: FormGroup;

  constructor(private sdApi: ServiceDeskApi) { }

  ngOnInit(): void {
    this.searchService = new FormControl();
    this.isNoService = new FormControl(false);
    this.isNoService.valueChanges.subscribe(isManually => {
      if (isManually) {
        this.searchService.disable();
      } else {
        this.searchService.enable();
      }
    });
    this.createSearchServiceSubscription();
  }

  /**
   * Событие выбора услуги у компонента autocomplete
   *
   * @param service - выбранный работник
   */
  serviceSelected(service: IService): void {
    this.sdRequestForm.patchValue({
      service_id: service.id,
      service_name: service.name
    });
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
   * Очищает поле поиска услуги и соответствующие поля формы, которая отправится на сервер.
   */
  clearService(): void {
    this.searchService.setValue(null);
    this.serviceSelected({ } as IService);
  }

  /**
   * Подписывается на поле поиска услуги и возвращает массив.
   */
  private createSearchServiceSubscription(): void {
    this.serviceList$ = this.sdApi.getServices().pipe(catchError(error => {
      // TODO: Добавить вывод ошибки через всплывающее окно.
      this.searchService.setErrors({ serverError: true});

      return of([]);
    }));

    this.services$ = this.searchService.valueChanges.pipe(
      startWith(''),
      filter(term => typeof term === 'string'),
      mergeMap(term => {
        return this.serviceList$.pipe(map(services => {
          if (!term) {
            return services;
          }

          return services.filter(service => service.name.toLowerCase().includes(term.toLowerCase()));
        }));
      })
    );
  }
}
