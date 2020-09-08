import { Component, EventEmitter, Output } from '@angular/core';

import { AuthHelper } from 'auth-center';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authHelper: AuthHelper) { }

  logout(): void {
    this.authHelper.logout();
  }
}
