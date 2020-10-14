export class ModelFactory<T, K = any> {
  constructor(private modelConstructor: new (params: any) => T) { }

  create(attrs: K = { } as K): T {
    return new this.modelConstructor(attrs);
  }
}
