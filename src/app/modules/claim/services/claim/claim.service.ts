import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IClaim } from '@modules/claim/interfaces/claim.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  readonly api = `${environment.serverUrl}/api/v1/claims`;

  constructor(private http: HttpClient) {}

  /**
   * Получает с сервера список заявок.
   */
  getClaims(): Observable<IClaim[]> {
    return this.http.get<IClaim[]>(this.api);
  }
}
