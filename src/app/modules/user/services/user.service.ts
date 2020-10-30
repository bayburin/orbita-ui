import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { IUser } from '@modules/user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly api = `${environment.serverUrl}/api/v1/users`;

  constructor(private http: HttpClient) { }

  /**
   * Получает с сервера список пользователей.
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.api);
  }
}
