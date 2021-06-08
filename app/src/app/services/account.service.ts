import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from './api.service';
import Account from '../models/account';
import Patch from '../models/patch';

@Injectable({
  providedIn: 'root',
})
export default class accountService extends ApiService {
  protected root = 'api';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.get<Account[]>('/accounts');
  }

  postAccount(account: any): Observable<Account> {
    return this.post<any, Account>('/accounts', account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.delete<void>(`/accounts/${id}`);
  }

  putAccount(account: Account): Observable<Account> {
    return this.put<Account>('/accounts', account);
  }

  patchAccount(request: Patch): Observable<Account> {
    return this.patch<Account>('/accounts', request);
  }
}
