import { Component, Input, Output, EventEmitter } from '@angular/core';

import { expandAnimation } from '@core/animations/expand.animation';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { MatTableDataSource } from '@angular/material/table';
import { claimPrioritiesMap } from '@modules/claim/enums/claim-priorities.enum';
import { claimStatusesMap } from '@modules/claim/enums/claim-statuses.enum';

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.scss'],
  animations: [expandAnimation]
})
export class ClaimsTableComponent {
  claimPriorities = claimPrioritiesMap;
  claimStatuses = claimStatusesMap;
  displayedColumns = ['id', 'createdAt', 'finishedAtPlan', 'priority', 'status', 'serviceName', 'description', 'workers', 'actions'];
  expandedEl: Claim | null;
  @Input() dataSource: MatTableDataSource<Claim>;
  @Output() onselect = new EventEmitter<number>();

  constructor() { }

  /**
   * Раскрывает указанную заявку и загружает данные по нему.
   *
   * @param element - объект заявки.
   */
  toggleRow(element: Claim): void {
    if (this.expandedEl === element) {
      this.expandedEl = null;

      return;
    }

    this.onselect.emit(element.id);
    this.expandedEl = element;
  }

  /**
   * Проверяет, выбрана ли указанная заявка.
   *
   * @param element - объект заявки.
   */
  isSelected(element: Claim): boolean {
    return element === this.expandedEl;
  }
}
