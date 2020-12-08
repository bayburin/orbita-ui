import { FormatBytesPipe } from './format-bytes.pipe';

describe('FormatBytesPipe', () => {
  let pipe: FormatBytesPipe;

  beforeEach(() => {
    pipe = new FormatBytesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "0 Байт" if bytes is equal zero', () => {
    expect(pipe.transform(0)).toEqual('0 Байт');
  });

  it('should return "1 Кб" if bytes is more than 1024', () => {
    expect(pipe.transform(1024)).toEqual('1 Кб');
    expect(pipe.transform(1030)).toEqual('1.01 Кб');
  });

  it('should return "1 Мб" if bytes is more than 1024 * 1024', () => {
    expect(pipe.transform(1024 * 1024)).toEqual('1 Мб');
    expect(pipe.transform(1024 * 1030)).toEqual('1.01 Мб');
  });

  it('should return "1 Гб" if bytes is more than 1024 * 1024', () => {
    expect(pipe.transform(1024 * 1024 * 1024)).toEqual('1 Гб');
    expect(pipe.transform(1024 * 1024 * 1030)).toEqual('1.01 Гб');
  });
});
