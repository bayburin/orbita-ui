import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

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
  @Input() sdRequestForm: FormGroup;

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchService = this.formService.searchService;
    this.isNoService = this.formService.isNoService;
    this.services$ = this.formService.services$;
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
  clearService(): void {
    this.formService.clearService();
  }
}
