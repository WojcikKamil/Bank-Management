import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import UserService from 'src/app/services/user.service';
import User from 'src/app/models/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import AccountService from 'src/app/services/account.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss'],
})
export default class UsersListComponent implements OnInit {
  selection!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
  ) {}

  async ngOnInit() {
    this.selection = this.formBuilder.group({
      usersList: [[this.currentUser.id]],
    });

    await this.userService.initUsersList();
  }

  get currentUser(): User {
    return this.userService.getCurrentUser()!;
  }

  get bankersList(): User[] {
    return this.userService
      .getBankers()
      .filter((u) => u.id !== this.currentUser.id);
  }

  get clientsList(): User[] {
    return this.userService
      .getClients()
      .filter((u) => u.id !== this.currentUser.id);
  }

  get usersListControl() {
    return this.selection.get('usersList')!;
  }

  updateUsersSelection() {
    this.accountService.toggleUserAccounts(this.usersListControl!.value);
  }

  getIcon(user: User): string {
    return this.usersListControl!.value.includes(user.id)
      ? 'person'
      : 'person_outlined';
  }
}
