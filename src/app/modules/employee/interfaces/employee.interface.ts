export type gender = 'М' | 'Ж';

export interface IBaseEmployee {
  lastName: string;
  firstName: string;
  middleName: string;
  id: number;
  dateOfBirth: string;
  sex: gender;
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
