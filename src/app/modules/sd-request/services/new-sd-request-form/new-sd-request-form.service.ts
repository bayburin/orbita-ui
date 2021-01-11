import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SvtApi } from '@modules/sd-request/api/svt/svt.api';

@Injectable({
  providedIn: 'root'
})
export class NewSdRequestFormService {
  constructor(private svtApi: SvtApi) { }

  /**
   * Сохраняет форму.
   */
  save(): void { }

  /**
   * Ищет технику по инвентарному номеру.
   *
   * @param inventNum - инвентарный номер.
   */
  searchSvtItems(inventNum: string): Observable<ISvtItem[]> {
    return this.svtApi.getAnyItems(inventNum);
  }

  /**
   * Загружает технику, прикрепленную за пользователем.
   *
   * @param idTn - параметр id_tn пользователя.
   */
  loadUserSvtItems(idTn: number): Observable<ISvtItem[]> {
    return this.svtApi.getUserItems(idTn);
  }
}
