import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from './api.service';
import Account from '../models/account';
import CreateAccountRequest from '../requests/create-account.request';
import TransactionService from './transaction.service';

@Injectable({
  providedIn: 'root',
})
export default class AccountService extends ApiService {
  protected root = 'api';

  constructor(
    protected http: HttpClient,
    protected transactionService: TransactionService,
  ) {
    super(http);
  }

  private selectedAccount?: Account;

  private accountsOwnersIds: number[] = [];

  public filteredAccountsList: Account[] = [];

  public getSelectedAccount(): Account|undefined {
    return this.selectedAccount;
  }

  async initUserAccounts(userId: number): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this.$getUserAccounts(userId).subscribe(
        (response: Account[]) => {
          this.accountsOwnersIds.push(userId);
          this.filteredAccountsList = response;

          const arrayDestructing = response[0];
          this.selectedAccount = arrayDestructing;

          this.transactionService.initTransactionsList(arrayDestructing.id);

          resolve(response);
        },
        (error) => {
          reject(new Error(error.error));
        },
      );
    });
  }

  selectAccount(account: Account) {
    this.selectedAccount = account;
  }

  async updateUserAccounts() {
    this.filteredAccountsList = [];

    this.accountsOwnersIds.forEach((a) => {
      this.$getUserAccounts(a).subscribe((response) => {
        this.filteredAccountsList = this.filteredAccountsList.concat(response);
      });
    });
  }

  toggleUserAccounts(userIds :number[]) {
    this.accountsOwnersIds = userIds;

    this.updateUserAccounts();
  }

  private $getUserAccounts(userId: number): Observable<Account[]> {
    return this.get<Account[]>(`/accounts/${userId}`);
  }

  private $postAccount(account: CreateAccountRequest): Observable<Account> {
    return this.post<any, Account>('/accounts', account);
  }

  private $deleteAccount(id: number): Observable<void> {
    return this.delete<void>(`/accounts/${id}`);
  }
}
