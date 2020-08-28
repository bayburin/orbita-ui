import { NgModule } from '@angular/core';

/**
 * Navigation
 */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

/**
 * Buttons & Indicators
 */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';


/**
 * Layout
 */
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

const modules: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatBadgeModule,
  MatDividerModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule { }
