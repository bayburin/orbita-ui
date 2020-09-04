import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '../../facades/auth.facade';

@Component({
  selector: 'ac-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {
  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
    // this.authFacade.initAuthenticateProcess();
  }
}
