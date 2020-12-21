import { IBaseEmployee } from './employee.interface';

export interface IBaseEmployeeGroup {
  dept: number;
  employees: IBaseEmployee[];
}
