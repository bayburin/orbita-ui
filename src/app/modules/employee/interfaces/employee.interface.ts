import { Genders } from '@modules/employee/enums/gender.enum';

export interface IBaseEmployee {
  lastName: string;
  firstName: string;
  middleName: string;
  id: number;
  dateOfBirth: string;
  sex: Genders;
  fullName: string;
  personnelNo: number;
  departmentForAccounting: number;
  deptForDocs: string;
  professionForAccounting: string;
  inVacation: boolean;
  vacation?: string;
  vacationFrom?: string;
  vacationTo?: string;
  employeeStatusId: number;
  employeeStatus: string;
  struct: string;
  phoneText: string;
  emailText: string;
  position: string;
}

export interface IExtendEmployeee {

}

export interface IEmployee {
  baseInfo: IBaseEmployee;
  extendInfo: IExtendEmployeee;
}
