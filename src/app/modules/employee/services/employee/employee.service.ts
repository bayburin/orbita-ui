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

  getEmployees(filter?: { fio: string; }): Observable<IBaseEmployee[]> {
    const params = filter ? new HttpParams().set('fio', filter.fio) : {};

    return this.http.get<IBaseEmployee[]>(this.api, { params });
  }
}
