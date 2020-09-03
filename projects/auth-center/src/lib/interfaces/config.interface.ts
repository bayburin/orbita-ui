export interface IConfig {
  authorizationServer?: string;
  clientId: string;
  responseType?: string;
  state?: string;
  redirectUri: string;
  scope?: string;
}
