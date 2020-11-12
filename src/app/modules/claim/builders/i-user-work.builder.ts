import { IUserWork } from '@modules/claim/interfaces/user-work.interface';

export class IUserWorkBuilder {
  userWork: IUserWork;

  constructor() {
    this.userWork = {
      id: 1,
      user_id: 1,
      work_id: 1
    };
  }

  build(): IUserWork {
    return this.userWork;
  }
}
