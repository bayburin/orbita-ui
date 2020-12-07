export abstract class ModelBuilder<T> {
  model: T;

  /**
   * Создает объект и возвращает его.
   */
  build(): T {
    return this.model;
  }
}
