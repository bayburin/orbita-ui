import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor() { }

  /**
   * Изменяет размер sidenav.
   */
  resizeSidenav(): void {
    console.log('toogle');
  }
}
