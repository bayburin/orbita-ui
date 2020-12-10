// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverApi: 'https://orbita-dev.iss-reshetnev.ru/api',
  serviceDeskApi: 'https://inv-dev.iss-reshetnev.ru/api',
  svtApi: 'https://svt.iss-reshetnev.ru',
  auth: {
    clientId: '86',
    // redirectUrl: 'https://localhost.iss-reshetnev.ru:4200/oauth2/callback',
    // redirectUrl: 'https://orbita-dev.iss-reshetnev.ru/oauth2/callback',
    // serverUrl: 'https://orbita-dev.iss-reshetnev.ru/api/v1/auth/token',
    redirectUrl: 'https://orbita-dev.iss-reshetnev.ru/oauth2/callback',
    serverUrl: 'https://orbita-dev.iss-reshetnev.ru/api/v1/auth/token',
    appName: 'Орбита (dev)',
    jwtOptions: {
      allowedDomains: ['https://orbita-dev.iss-reshetnev.ru'],
      disallowedRoutes: []
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
