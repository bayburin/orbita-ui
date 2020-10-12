import { User } from '@core/models/user.model';

export class AuthFacadeStub {
  getCurrentUser(): User { return new User({}); }
  logout(): void { }
}
