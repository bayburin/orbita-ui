import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';

@Component({
  selector: 'app-wizzard-svt',
  templateUrl: './wizzard-svt.component.html',
  styleUrls: ['./wizzard-svt.component.scss']
})
export class WizzardSvtComponent implements OnInit {
  searchSvtItem: FormControl;
  userSvtItems$: Observable<ISvtItem[]>;
  anySvtItems$: Observable<ISvtItem[]>;
  isNoSvtItem: FormControl;
  svtItemList: FormControl;
  @Input() sourceSnapshotForm: FormGroup;

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchSvtItem = this.formService.searchSvtItem;
    this.isNoSvtItem = this.formService.isNoSvtItem;
    this.userSvtItems$ = this.formService.userSvtItems$;
    this.anySvtItems$ = this.formService.anySvtItems$;
    this.svtItemList = this.formService.svtItemList;
  }

  /**
   * Событие выбора ВТ.
   *
   * @param item - выбранная техника.
   */
  selectSvtItem(item: ISvtItem): void {
    this.formService.svtItem = item;
  }

  /**
   * Очищает поле searchSvtItem.
   */
  clearSearchSvtItem(): void {
    this.formService.clearSearchSvtItem();
  }
}
