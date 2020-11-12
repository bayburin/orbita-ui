import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { UserFacade } from './modules/user/facades/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authHelper: AuthHelper,
    private userFacade: UserFacade
  ) { }

  ngOnInit(): void {
    this.authHelper.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.userFacade.loadUsers();
      }
    });
  }
}
