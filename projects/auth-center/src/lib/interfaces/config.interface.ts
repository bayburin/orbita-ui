export interface IStorageNaming {
  currentUser: string;
  authData: string;
  state: string;
}

export interface IConfig {
  authorizationServer?: string;
  apiServer: string;
  clientId: string;
  responseType?: string;
  state?: string;
  redirectUri: string;
  scope?: string;
  storageNaming?: IStorageNaming;
}
