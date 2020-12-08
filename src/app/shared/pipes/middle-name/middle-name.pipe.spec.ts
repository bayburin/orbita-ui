import { MiddleNamePipe } from './middle-name.pipe';

import { IUser } from '@modules/user/interfaces/user.interface';

describe('MiddleNamePipe', () => {
  let pipe: MiddleNamePipe;

  beforeEach(() => {
    pipe = new MiddleNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return middlename', () => {
    const middleName = 'MiddleName';
    const user = { fio: `${middleName} FirstName LastName` } as IUser;

    expect(pipe.transform(user)).toEqual(middleName);
  });
});
