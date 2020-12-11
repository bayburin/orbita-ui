import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
   * Получает с список ВТ, закрепленных за пользователем.
   */
  getUserItems(idTn: number): Observable<ISvtItem[]> {
    return this.http.get<ISvtItem[]>(`${this.api}/user_isses/${idTn}/items`);
  }

  /**
   * Получает список ВТ, найденный по указанному параметру.
   */
  getAnyItems(term?: string): Observable<ISvtItem[]> {
    const params = new HttpParams().set('filter', term);

    return this.http.get<ISvtItem[]>(`${this.api}/api/v1/items`, { params });
  }
}
