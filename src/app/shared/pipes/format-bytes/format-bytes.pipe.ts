import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBytes',
  pure: true
})
export class FormatBytesPipe implements PipeTransform {
  transform(bytes: number): unknown {
    if (bytes === 0) {
      return '0 Байт';
    }

    const k = 1024;
    const sizes = ['Байт', 'Кб', 'Мб', 'Гб'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
