import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { ITag } from '@shared/interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagApi {
  readonly api = `${environment.serverApi}/v1/tags`;

  constructor(private http: HttpClient) { }

  /**
   * Получает с сервера список тегов.
   */
  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.api);
  }
}
