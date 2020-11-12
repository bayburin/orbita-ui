import * as moment from 'moment';

import { DatetimePipe } from './datetime.pipe';

describe('DatetimePipe', () => {
  let pipe: DatetimePipe;

  beforeEach(() => {
    pipe = new DatetimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format datetime value', () => {
    const datetime = moment('2013-02-08 09:30');

    expect(pipe.transform(datetime)).toEqual('08.02.13 09:30');
  });
});
