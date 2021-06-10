import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Transaction from '../models/transaction';
import GrantRequest from '../requests/grant.request';
import TransferRequest from '../requests/transfer.requests';
import ApiService from './api.service';

@Injectable({
  providedIn: 'root',
})
export default class TransactionService extends ApiService {
  protected root = 'api';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAccountTransactions(accountId: number): Observable<Transaction[]> {
    return this.get<Transaction[]>(`/transactions/${accountId}`);
  }

  transferFunds(request: TransferRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions', request);
  }

  grantFunds(request: GrantRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions', request);
  }
}
