import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IService } from '@modules/sd-request/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceDeskApi {
  readonly api = `${environment.serviceDeskApi}/v1`;

  constructor(private http: HttpClient) { }

  /**
   * Получает с сервера техподдержки список доступных услуг.
   */
  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(`${this.api}/services`);
  }
}
