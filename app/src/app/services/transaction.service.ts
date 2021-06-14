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

  private unfilteredTransactionsList: Transaction[] = [];

  public getIncomingTransactionsList(accountNumber: string): Transaction[] {
    return this.unfilteredTransactionsList.filter((t) => t.receiverNumber === accountNumber);
  }

  public getOutcomingTransactionsList(accountNumber: string): Transaction[] {
    return this.unfilteredTransactionsList.filter((t) => t.senderNumber === accountNumber);
  }

  public async initTransactionsList(accountId: number): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      this.$getAccountTransactions(accountId).subscribe(
        (response) => {
          this.unfilteredTransactionsList = response;
          resolve(response);
        },
        (error) => {
          reject(new Error(error.error));
        },
      );
    });
  }

  private $getAccountTransactions(accountId: number): Observable<Transaction[]> {
    return this.get<Transaction[]>(`/transactions/${accountId}`);
  }

  private $transferFunds(request: TransferRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions', request);
  }

  private $grantFunds(request: GrantRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions', request);
  }
}
