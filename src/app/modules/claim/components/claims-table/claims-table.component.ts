import { Component, Input } from '@angular/core';

import { Claim } from '@modules/claim/models/claim/claim.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.scss']
})
export class ClaimsTableComponent {
  displayedColumns = ['id', 'createdAt', 'finishedAtPlan', 'priority', 'status', 'serviceName', 'description', 'workers'];
  @Input() dataSource: MatTableDataSource<Claim>;

  constructor() { }
}
