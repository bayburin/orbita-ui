import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { MatListOption } from '@angular/material/list';
import { startWith, map } from 'rxjs/operators';
import { AuthHelper } from '@iss/ng-auth-center';

import { IUser } from '@modules/user/interfaces/user.interface';
import { UserFacade } from '@modules/user/facades/user.facade';
import { IUserGroup } from '@modules/user/interfaces/user-group.interface';

@Component({
  selector: 'app-workers-form',
  templateUrl: './workers-form.component.html',
  styleUrls: ['./workers-form.component.scss']
})
export class WorkersFormComponent implements OnInit {
  userGroups$: Observable<IUserGroup[]>;
  searchWorker: FormControl = new FormControl();
  workers = [this.authHelper.getJwtPayload()];

  constructor(
    private userFacade: UserFacade,
    private authHelper: AuthHelper
  ) { }

  ngOnInit(): void {
    this.searchWorkers();
  }

  /**
   * Событие выбора/удаления исполнителей.
   *
   * @oarams event - объект события
   */
  selectWorkerEvent(event: MatListOption): void {
    const worker = event.value;

    if (event.selected) {
      this.workers.push(worker);
    } else {
      this.workers = this.workers.filter(w => w.id !== worker.id);
    }
  }

  /**
   * Очищает поле, фильтрующее исполнителей.
   */
  clearSearchWorker(): void {
    this.searchWorker.setValue('');
  }

  /**
   * Проверяет, находится ли исполнитель в списке выбранных.
   *
   * @param worker - исполнитель
   */
  isWorkerSelected(worker: IUser): boolean {
    return this.workers.some((u: IUser) => u.id === worker.id);
  }

  /**
   * Проверяет, является ли указанный исполнитель текущим пользователем системы.
   *
   * @param worker - исполнитель
   */
  isCurrentUser(worker: IUser): boolean {
    return this.authHelper.getJwtPayload().id === worker.id;
  }

  /**
   * Возвращает отфильтрованный список пользователей, сгруппированный по группам.
   */
  private searchWorkers(): void {
    const filterObs = this.searchWorker.valueChanges.pipe(startWith(''));

    this.userGroups$ = combineLatest([filterObs, this.userFacade.users$]).pipe(
      map(data => data[1].filter(user => user.fio.toLowerCase().includes(data[0].toLowerCase()))),
      map(users => this.userFacade.createGroups(users))
    );
  }
}
