import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@modules/user/interfaces/user.interface';

@Pipe({
  name: 'middleName',
  pure: true
})
export class MiddleNamePipe implements PipeTransform {
  transform(user: IUser): string {
    return user.fio.split(' ')[0];
  }
}
