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

  private lastTransactionAmount?: number;

  private lastTransactionTitle?: string;

  getLastTransactionTitle(): string|undefined {
    return this.lastTransactionTitle;
  }

  getLastTransactionAmount(): number|undefined {
    return this.lastTransactionAmount;
  }

  setLastTransactionTitle(value: string) {
    this.lastTransactionTitle = value;
  }

  setLastTransactionAmount(value: number) {
    this.lastTransactionAmount = value;
  }

  clearLastTransactionValues() {
    this.lastTransactionAmount = undefined;
    this.lastTransactionAmount = undefined;
  }

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

  public async transferFunds(request: TransferRequest): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.$transferFunds(request).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(new Error(err.error));
      });
    });
  }

  public async grant(request: GrantRequest): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.$grantFunds(request).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(new Error(err.error));
      });
    });
  }

  private $getAccountTransactions(accountId: number): Observable<Transaction[]> {
    return this.get<Transaction[]>(`/transactions/${accountId}`);
  }

  private $transferFunds(request: TransferRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions/transfer', request);
  }

  private $grantFunds(request: GrantRequest): Observable<Transaction> {
    return this.patch<Transaction>('/transactions/grant', request);
  }
}
