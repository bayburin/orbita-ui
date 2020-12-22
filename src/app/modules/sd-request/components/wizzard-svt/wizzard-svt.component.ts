import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, mergeMap, catchError } from 'rxjs/operators';

import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';

@Component({
  selector: 'app-wizzard-svt',
  templateUrl: './wizzard-svt.component.html',
  styleUrls: ['./wizzard-svt.component.scss']
})
export class WizzardSvtComponent implements OnInit {
  searchSvtItem: FormControl = new FormControl();
  userSvtItems$: Observable<ISvtItem[]>;
  anySvtItems$: Observable<ISvtItem[]>;
  isNoSvtItem: FormControl = new FormControl(false);
  selectedSvtItem: ISvtItem;
  svtItemList: FormControl = new FormControl();
  @Input() sourceSnapshotForm: FormGroup;

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchUserItems();
    this.searchSvtItems();
    this.processingIsNoSvtItems();
  }

  /**
   * Обрабатывает событие выбора ВТ.
   *
   * @param item - выбранная техника.
   */
  selectSvtItem(item: ISvtItem): void {
    this.selectedSvtItem = item;
    this.updateSvtItem(item);
  }

  /**
   * Очищает поле поиска ВТ и соответствующие поля формы, которая отправится на сервер.
   */
  clearSearchSvtItem(): void {
    this.searchSvtItem.setValue(null);
    this.updateSvtItem(null);
  }

  /**
   * Подписывается на поле поиска техники и ищет технику.
   */
  private searchSvtItems(): void {
    this.anySvtItems$ = this.searchSvtItem.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      mergeMap(term => {
        return this.formService.searchSvtItems(term)
          .pipe(catchError(error => {
            console.log(error);
            this.searchSvtItem.setErrors({ serverError: true});

            return of([]);
          })
        );
      })
    );
  }

  /**
   * Подписывается на поле id_tn и по его данным ищет связанную ВТ.
   */
  private searchUserItems(): void {
    this.userSvtItems$ = this.sourceSnapshotForm.get('id_tn').valueChanges.pipe(
      debounceTime(300),
      mergeMap(idTn => {
        return this.formService.loadUserSvtItems(idTn)
          .pipe(catchError(error => {
            console.log(error);

            return of([]);
          })
        );
      })
    );
  }

  /**
   * Подписывается на поле "isNoSvtItem" и по результатам активирует/отключает поле "searchSvtItem" и список "svtItemList".
   */
  private processingIsNoSvtItems(): void {
    this.isNoSvtItem.valueChanges.subscribe(isActive => {
      if (isActive) {
        this.searchSvtItem.disable();
        this.svtItemList.disable();
        this.updateSvtItem(null);
      } else {
        this.searchSvtItem.enable();
        this.svtItemList.enable();
        this.updateSvtItem(this.selectedSvtItem);
      }
    });
  }

  /**
   * Обновляет поля формы, связанные с выбранной ВТ.
   *
   * @param svtItem - ВТ.
   */
  private updateSvtItem(svtItem: ISvtItem): void {
    this.sourceSnapshotForm.patchValue({
      invent_num: svtItem?.invent_num || '',
      svt_item_id: svtItem?.item_id || null,
      svt_item: svtItem?.type ? `${svtItem.type.short_description} ${svtItem.item_model}` : ''
    });
  }
}
