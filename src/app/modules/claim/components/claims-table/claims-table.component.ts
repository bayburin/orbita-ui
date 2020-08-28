import { Observable, of } from 'rxjs';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.scss']
})
export class ClaimsTableComponent {
  displayedColumns = ['id', 'status', 'service_name'];
  @Input() dataSource: Observable<IClaim[]> = of([{ id: 1, status: 'Новая', service_name: 'Служба печати' } as IClaim]);

  constructor() { }
}
