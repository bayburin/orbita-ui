export class User {
  idTn: number;
  tn: number;
  fio: string;
  dept: number;
  email: string;
  isVacation: boolean;
  mobileTel: string;
  workTel: string;
  roleId: number;
  fioInitials: string;

  constructor(user: any = {}) {
    this.idTn = user.id_tn;
    this.tn = user.tn;
    this.fio = user.fio;
    this.dept = user.dept;
    this.email = user.email;
    this.isVacation = user.is_vacation;
    this.mobileTel = user.mobile_tel;
    this.workTel = user.work_tel;
    this.roleId = user.role_id;
    this.fioInitials = user.fio_initials;
  }
}
