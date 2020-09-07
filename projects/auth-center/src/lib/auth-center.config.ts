import { InjectionToken } from '@angular/core';

import { IConfig } from './interfaces/config.interface';

export const defaultConfig: IConfig = {
  authorizationServer: 'https://auth-center.iss-reshetnev.ru/oauth/authorize',
  serverUrl: '',
  clientId: '',
  responseType: 'code',
  state: '',
  redirectUrl: '',
  scope: '',
  storageNaming: {
    currentUser: 'currentUser',
    authData: 'authData',
    state: 'state'
  }
};

export const CONFIG = new InjectionToken<IConfig>('config of module');
