import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
  transform(value: moment.Moment): unknown {
    if (value) {
      return value.format('DD.MM.YY HH:mm');
    } else {
      return '';
    }
  }
}
