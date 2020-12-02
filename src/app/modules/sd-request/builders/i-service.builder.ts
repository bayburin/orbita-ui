import { IService } from '@modules/sd-request/interfaces/service.interface';

export class IServiceBuilder {
  protected service: IService;

  constructor() {
    this.service = {
      id: 1,
      name: 'TestService'
    };
  }

  build(): IService {
    return this.service;
  }
}
