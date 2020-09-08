import { Component } from '@angular/core';

import { AuthHelper } from 'auth-center';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authHelper: AuthHelper) {
    // authHelper.getCurrentUser();
  }
}
