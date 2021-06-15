import { OnInit, Component } from '@angular/core';
import User from 'src/app/models/user';
import Account from 'src/app/models/account';
import AccountService from 'src/app/services/account.service';
import UserService from 'src/app/services/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import TransactionBottomSheet from '../../bottom-sheets/transaction.bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'accounts-list',
  templateUrl: 'accounts-list.component.html',
  styleUrls: ['accounts-list.component.scss'],
})
export default class AccountsListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private bottomSheet: MatBottomSheet,
    private snackbar: MatSnackBar,
  ) {}

  async ngOnInit() {
    await this.accountService.initUserAccounts(this.currentUser.id);
  }

  get filteredAccountsList() {
    return this.accountService.filteredAccountsList;
  }

  get currentUser(): User {
    return this.userService.getCurrentUser()!;
  }

  get selectedAccount() {
    return this.accountService.getSelectedAccount();
  }

  get isTargetSelection() {
    return this.accountService.getToggleStatus();
  }

  selectAccount(account: Account) {
    if (this.isTargetSelection && account.number === this.selectedAccount?.number) {
      this.snackbar.open('This account is already selected!', '', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn'],
        horizontalPosition: 'left',
      });
    }
    this.accountService.selectAccount(account);
    this.bottomSheet.open(TransactionBottomSheet);
  }
}
