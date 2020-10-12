export class ModelFactory<T> {
  constructor(private modelConstructor: new (params: any) => T) { }

  create(attrs: any = {}): T {
    return new this.modelConstructor(attrs);
  }
}
