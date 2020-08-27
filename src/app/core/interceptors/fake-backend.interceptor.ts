import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const claims = [
      {
        id: 1,
        service_id: 1,
        claim_template_id: 1,
        service_name: 'Печать',
        claim_template_name: 'Заявка на печать КД',
        status: 'opened',
        priority: 'high',
        claim_user: {
          tn: 17664,
          id_tn: 12880,
          fio: 'Байбурин Равиль Фаильевич',
          dept: 714,
          email: 'bayburin@iss-reshetnev.ru',
          work_tel: '84-29',
          mobile_tel: null,
          domain: 'BayburinRF'
        },
        time_info: {
          created_at: '04-05-2020 18:34',
          updated_at: '04-05-2020 18:34',
          finished_at_plan: '07-05-2020',
          finished_at: null
        },
        attrs: {},
        rating: null
      }
    ];

    if (req.url.endsWith('claims') && req.method === 'GET') {
      return of(new HttpResponse({ body: claims, status: 200 }));
    }

    return next.handle(req);
  }
}
