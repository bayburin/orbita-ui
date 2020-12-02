import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly api = `${environment.serverApi}/v1/employees`;

  constructor(private http: HttpClient) { }

  /**
   * Получает список работников.
   *
   * @param key - имя фильтра
   * @param value - начение фильтра
   */
  getEmployees(key?: string, value?: string): Observable<IBaseEmployee[]> {
    let params = {};

    if (key) {
      params = new HttpParams()
                 .set('key', key)
                 .set('value', value);
    }

    return this.http.get<IBaseEmployee[]>(this.api, { params });
  }
}
