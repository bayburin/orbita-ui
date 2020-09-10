import { Observable } from 'rxjs';

import { CurrentUser } from './../models/current_user.model';

export abstract class AuthHelperAbstract {
  /**
   * Флаг, показывающий, авторизован ли пользователь.
   */
  isAuthenticated$: Observable<boolean>;

  /**
   * Возвращает текущего пользователя.
   */
  abstract getCurrentUser(): CurrentUser;

  /**
   * Редиректит на страницу "/oauth2/unauthorized" для выхода из приложения.
   */
  abstract logout(): void;
}
