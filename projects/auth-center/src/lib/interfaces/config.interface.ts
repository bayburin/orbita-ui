export interface IStorageNaming {
  jwt: string;
  state: string;
}

export interface IConfig {
  authorizationServer?: string;
  serverUrl: string;
  clientId: string;
  responseType?: string;
  state?: string;
  redirectUrl: string;
  scope?: string;
  storageNaming?: IStorageNaming;
}
