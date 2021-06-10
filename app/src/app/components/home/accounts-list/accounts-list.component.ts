import { OnInit, Component } from '@angular/core';
import SessionStorage from 'src/app/helpers/session-storage';
import User from 'src/app/models/user';
import Account from 'src/app/models/account';
import AccountService from 'src/app/services/account.service';

@Component({
  selector: 'accounts-list',
  templateUrl: 'accounts-list.component.html',
  styleUrls: ['accounts-list.component.scss'],
})
export default class AccountsList implements OnInit {
  constructor(
    private session: SessionStorage,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.accountService.getUserAccounts(this.currentUser.id).subscribe((response) => {
      this.filteredAccounts = response;
    });
  }

  filteredAccounts?: Array<Account>;

  get currentUser(): User {
    return this.session.getCurrentUser();
  }
}
