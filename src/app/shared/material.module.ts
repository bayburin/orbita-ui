import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Navigation
 */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

/**
 * Buttons & Indicators
 */
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';


/**
 * Layout
 */
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

//
// Data Table
//

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const modules: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatBadgeModule,
  MatDividerModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
