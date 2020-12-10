import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';

@Injectable({
  providedIn: 'root'
})
export class SvtApi {
  readonly api = environment.svtApi;

  constructor(private http: HttpClient) { }

  /**
   * Получает с SVT сервера список ВТ, закрепленных за пользователем.
   */
  getUserItems(idTn: number): Observable<ISvtItem[]> {
    return this.http.get<ISvtItem[]>(`${this.api}/user_isses/${idTn}/items`);
  }
}
