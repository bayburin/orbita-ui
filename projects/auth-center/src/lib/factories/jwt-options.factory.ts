import { AuthState } from '../store/auth.state';

export function jwtOptionsFactory(authState: AuthState) {
  return {
    tokenGetter: () => {
      return authState.getJwt();
    },
    skipWhenExpired: true
  };
}
