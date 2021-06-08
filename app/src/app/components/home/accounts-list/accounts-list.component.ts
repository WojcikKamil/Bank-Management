import { Component } from '@angular/core';
import SessionStorage from 'src/app/helpers/session-storage';
import User from 'src/app/models/user';

@Component({
  selector: 'accounts-list',
  templateUrl: 'accounts-list.component.html',
  styleUrls: ['accounts-list.component.scss'],
})
export default class AccountsList {
  constructor(private session: SessionStorage) {}

  get currentUser(): User {
    return this.session.getCurrentUser();
  }

  temporaryDataSeed = [
    {
      id: 1,
      number: '11111111',
      balance: 1500,
      userId: 13,
    },
    {
      id: 2,
      number: '22222222',
      balance: 0,
      userId: 13,
    },
    {
      id: 3,
      number: '22222222',
      balance: 50.5,
      userId: 13,
    },
  ]
}
