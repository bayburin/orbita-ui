import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class RuntimeFactory {
  static create(attrs: IRuntime = { } as IRuntime): Runtime {
    return new Runtime(attrs);
  }
}
