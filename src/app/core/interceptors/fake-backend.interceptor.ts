import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const claims: IClaim[] = [
    //   {
    //     id: 1,
    //     service_id: 1,
    //     app_template_id: 1,
    //     service_name: 'Печать',
    //     app_template_name: 'Заявка на печать КД',
    //     status: 'opened',
    //     priority: 'high',
    //     claim_user: {
    //       tn: 17664,
    //       id_tn: 12880,
    //       fio: 'Байбурин Равиль Фаильевич',
    //       dept: 714,
    //       email: 'bayburin@iss-reshetnev.ru',
    //       work_tel: '84-29',
    //       mobile_tel: null,
    //       domain: 'BayburinRF'
    //     },
    //     runtime: {
    //       created_at: '04-05-2020 18:34',
    //       updated_at: '04-05-2020 18:34',
    //       finished_at_plan: '07-05-2020',
    //       finished_at: null
    //     },
    //     attrs: {},
    //     rating: null
    //   }
    // ];

    // if (req.url.endsWith('claims') && req.method === 'GET') {
    //   return of(new HttpResponse({ body: claims, status: 200 })).pipe(
    //     materialize(),
    //     delay(1500),
    //     dematerialize()
    //   );
    // }

    const employees = [
      {
        lastName: "БАЙБУРИН",
        firstName: "РАВИЛЬ",
        middleName: "ФАИЛЬЕВИЧ",
        positionId: 6131,
        id: 12880,
        dateOfBirth: "1992-04-18",
        sex: "М",
        fullName: "Байбурин Равиль Фаильевич",
        personnelNo: 17664,
        departmentId: 10134,
        departmentForAccounting: 714,
        departmentForDocuments: "714",
        deptForDocs: "714",
        professionCode: 228242,
        professionForAccounting: "ИНЖЕНЕР-ПРОГРАММИСТ 2 КАТЕГОРИИ",
        professionForDocuments: "ИНЖЕНЕР-ПРОГРАММИСТ 2 КАТЕГОРИИ",
        inVacation: false,
        employeeStatusId: 0,
        employeeStatus: "Основной",
        struct: "7141",
        computerName: ".........",
        phone:["84-29"],
        mobilePhone:[],
        email:["bayburin@iss-reshetnev.ru"],
        phoneText: "84-29",
        emailText: "bayburin@iss-reshetnev.ru",
        position: "3а-321а"
      }
    ];

    if (req.url.endsWith('employees') && req.method === 'GET') {
      return of(new HttpResponse({ body: employees, status: 200 }));
    }

    return next.handle(req).pipe(
    //   materialize(),
    //   delay(1500),
    //   dematerialize()
    );
  }
}
