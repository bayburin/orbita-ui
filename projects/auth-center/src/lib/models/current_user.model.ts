export class CurrentUser {
  // TODO: Сейчас перечислены атрибуты, получаемые с AuthCenter. Возможно нужно сделать данные, которые возвращает штатная расстановка.
  room: string;
  tel: string;
  email: string;
  comment: string;
  duty: string;
  status: string;
  datereg: string;
  dutyCode: number;
  fioInitials: string;
  category: number;
  login: string;
  ms: number;
  deptKadr: number;
  tnMs: number;
  adLogin: string;
  mail: string;
  surname: string;
  firstname: string;
  middlename: string;
  initialsFamily: string;
  familyWithInitials: string;
  isChief: boolean;

  constructor(
    public idTn: number = null,
    public tn: number = null,
    public fio: string = '',
    public dept: number = null,
  ) { }
}
