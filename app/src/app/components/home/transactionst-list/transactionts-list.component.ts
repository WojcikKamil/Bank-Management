import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Account from 'src/app/models/account';
import AccountService from 'src/app/services/account.service';
import TransactionService from 'src/app/services/transaction.service';
import UserService from 'src/app/services/user.service';
import User from 'src/app/models/user';
import Transaction from 'src/app/models/transaction';

export interface DateObject {
  hour: string,
  minute: string,
  day: string,
  month: string,
  year: string,
}

export interface TransactionSupplier {
  color: string,
  userType: string,
  displayNumber: string,
  symbol: string,
}

@Component({
  selector: 'transactionts-list',
  templateUrl: 'transactionts-list.component.html',
  styleUrls: ['transactionts-list.component.scss'],
})
export default class TransactionsListComponent implements OnInit {
  transactionsForm!: FormGroup;

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {}

  async ngOnInit() {
    this.transactionsForm = this.formBuilder.group({
      matButtonToggleGroup: ['all'],
    });

    await this.accountService.initUserAccounts(this.currentUser.id);
    await this.transactionService.initTransactionsList(this.selectedAccount!.id);
  }

  // get panels():any[] {
  //   const today = new Date().getTime();
  //   return [
  //     {
  //       displayValue: 'From past 24 hours',
  //       timeFrom: today,
  //       timeTo: today - 86400000,
  //     },
  //     {
  //       displayValue: 'From past 7 days',
  //       timeFrom: today - 86400000,
  //       timeTo: today - 604800000,
  //     },
  //     {
  //       displayValue: 'From past month',
  //       timeFrom: today - 604800000,
  //       timeTo: today - 2629800000,
  //     },
  //     {
  //       displayValue: 'From past 3 months',
  //       timeFrom: today - 2629800000,
  //       timeTo: today - 7889400000,
  //     },
  //     {
  //       displayValue: 'Older than 3 months',
  //       timeFrom: today - 7889400000,
  //       timeTo: 0,
  //     },
  //   ];
  // }

  get panels(): any[] {
    return [{
      displayValue: 'hello',
      timeFrom: 0,
      timeTo: 1,
    }];
  }

  get selectionValue(): string {
    return this.transactionsForm.get('matButtonToggleGroup')!.value;
  }

  get currentUser(): User {
    return this.userService.getCurrentUser()!;
  }

  get selectedAccount(): Account|undefined {
    return this.accountService.getSelectedAccount();
  }

  private getIncomeHistory(): Transaction[] {
    return this.selectedAccount === undefined
      ? []
      : this.transactionService.getIncomingTransactionsList(this.selectedAccount!.number);
  }

  private getOutcomeHistory(): Transaction[] {
    return this.selectedAccount === undefined
      ? []
      : this.transactionService.getOutcomingTransactionsList(this.selectedAccount!.number);
  }

  private geTransactionsHistory(): Transaction[] {
    let fullHistory: Transaction[] = [];
    fullHistory = fullHistory.concat(this.getIncomeHistory(), this.getOutcomeHistory());
    return fullHistory;
  }

  get filteredTransactions(): Transaction[] {
    if (this.selectionValue === 'inbound') return this.getIncomeHistory();
    if (this.selectionValue === 'outbound') return this.getOutcomeHistory();
    if (this.selectionValue === 'all') return this.geTransactionsHistory();

    return [];
  }

  // getFilteredTransactions(panel: any): Transaction[] {
  //   let history: Transaction[] = [];
  //   if (this.selectionValue === 'inbound') history = this.getIncomeHistory();
  //   if (this.selectionValue === 'outbound') history = this.getOutcomeHistory();
  //   if (this.selectionValue === 'all') history = this.geTransactionsHistory();

  //   return [];
  // }

  public objectifyDate(transaction: Transaction): DateObject {
    return {
      year: transaction.timestamp.toString().substring(0, 4),
      month: transaction.timestamp.toString().substring(5, 7),
      day: transaction.timestamp.toString().substring(8, 10),
      hour: transaction.timestamp.toString().substring(11, 13),
      minute: transaction.timestamp.toString().substring(14, 16),
    };
  }

  private checkTime(transaction: Transaction, panel: any): boolean {
    const dateDiff = new Date().getTime() - new Date(transaction.timestamp).getTime();
    return dateDiff < panel.timeFrom && dateDiff > panel.timeTo;
  }

  supplyModel(t: Transaction): TransactionSupplier {
    const timestamp: Date = new Date(t.timestamp);
    return (t.receiverNumber === this.selectedAccount!.number)
      ? {
        color: 'green',
        userType: 'Sender',
        symbol: '+',
        displayNumber: t.senderNumber,
      }
      : {
        color: 'red',
        userType: 'Receiver',
        symbol: '-',
        displayNumber: t.receiverNumber,
      };
  }
}
