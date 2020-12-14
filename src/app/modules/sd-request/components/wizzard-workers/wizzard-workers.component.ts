import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatListOption } from '@angular/material/list';

import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { UserGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { IUser } from '@modules/user/interfaces/user.interface';

@Component({
  selector: 'app-wizzard-workers',
  templateUrl: './wizzard-workers.component.html',
  styleUrls: ['./wizzard-workers.component.scss']
})
export class WizzardWorkersComponent implements OnInit {
  userGroups$: Observable<UserGroup[]>;
  searchUser: FormControl;
  @Input() sdRequestForm: FormGroup;

  get users() {
    return this.sdRequestForm.get('users');
  }

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.userGroups$ = this.formService.userGroups$;
    this.searchUser = this.formService.searchUser;
  }

  /**
   * Событие выбора/удаления исполнителей.
   *
   * @oarams event - объект события
   */
  selectUserEvent(event: MatListOption) {
    this.formService.selectUserEvent(event);
  }

  /**
   * Очищает поле, фильтрующее исполнителей.
   */
  clearSearchUser() {
    this.formService.clearSearchUser();
  }

  /**
   * Проверяет, находится ли исполнитель в списке выбранных.
   *
   * @param user - исполнитель
   */
  isUserSelected(user: IUser): boolean {
    return this.users.value && this.users.value.some((u: IUser) => u.id === user.id);
  }

  /**
   * Проверяет, является ли указанный исполнитель текущим пользователем системы.
   *
   * @param user - исполнитель
   */
  isCurrentUser(user: IUser): boolean {
    return this.formService.isCurrentUser(user);
  }
}
