import { Component } from '@angular/core';

import { AuthHelper } from 'auth-center';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private authHelper: AuthHelper) { }

  /**
   * Изменяет размер sidenav.
   */
  resizeSidenav(): void {
    console.log('toogle');
  }

  logout(): void {
    this.authHelper.logout();
  }
}
