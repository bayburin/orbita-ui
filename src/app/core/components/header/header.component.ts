import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { AuthFacade } from '@core/facades/auth.facade';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.user = this.authFacade.getCurrentUser();
  }

  logout(): void {
    this.authFacade.logout();
  }
}
