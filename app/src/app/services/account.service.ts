import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from './api.service';
import Account from '../models/account';
import CreateAccountRequest from '../requests/create-account.request';

@Injectable({
  providedIn: 'root',
})
export default class AccountService extends ApiService {
  protected root = 'api';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getUserAccounts(userId: number): Observable<Account[]> {
    return this.get<Account[]>(`/accounts/${userId}`);
  }

  postAccount(account: CreateAccountRequest): Observable<Account> {
    return this.post<any, Account>('/accounts', account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.delete<void>(`/accounts/${id}`);
  }
}
