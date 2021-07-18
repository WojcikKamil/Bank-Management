import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Account from 'src/app/models/account';
import AccountService from 'src/app/services/account.service';
import TransactionService from 'src/app/services/transaction.service';
import UserService from 'src/app/services/user.service';
import User from 'src/app/models/user';
import Transaction from 'src/app/models/transaction';
import DateService from 'src/app/services/date.service';

export interface TransactionSupplier {
  color: string,
  userType: string,
  displayNumber: string,
  symbol: string,
}

export interface Panel {
  id: number,
  displayValue: string,
  transactions: Transaction[],
  timeEarlier: number,
  timeLater: number,
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
    private dateService: DateService,
  ) {}

  async ngOnInit() {
    this.transactionsForm = this.formBuilder.group({
      matButtonToggleGroup: ['all'],
    });
  }

  private predefinedPanels: Panel[] = [
    {
      id: 1,
      displayValue: 'From past 24 hours',
      transactions: [],
      timeLater: new Date().getTime(),
      timeEarlier: new Date().getTime() - 86400000,
    },
    {
      id: 2,
      displayValue: 'From past 7 days',
      transactions: [],
      timeLater: new Date().getTime() - 86400000,
      timeEarlier: new Date().getTime() - 604800000,
    },
    {
      id: 3,
      displayValue: 'From past month',
      transactions: [],
      timeLater: new Date().getTime() - 604800000,
      timeEarlier: new Date().getTime() - 2629800000,
    },
    {
      id: 3,
      displayValue: 'From past 3 months',
      transactions: [],
      timeLater: new Date().getTime() - 2629800000,
      timeEarlier: new Date().getTime() - 7889400000,
    },
    {
      id: 4,
      displayValue: 'Older than 3 months',
      transactions: [],
      timeLater: new Date().getTime() - 7889400000,
      timeEarlier: 0,
    },
  ]

  get panels(): Panel[] {
    console.log('testest');
    return this.predefinedPanels.map((p) => {
      // eslint-disable-next-line no-param-reassign
      p.transactions = this.getFilteredTransactions(p.timeEarlier, p.timeLater);
      return p;
    });
  }

  isPanelHidden(panel: Panel): boolean {
    return panel.transactions.length === 0;
  }

  get selectionValue(): string {
    return this.transactionsForm?.get('matButtonToggleGroup')!.value;
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

  history: Transaction[] = [];

  getFilteredTransactions(timeEarlier: number, timeLater: number): Transaction[] {
    if (this.selectionValue === 'inbound') this.history = this.getIncomeHistory();
    if (this.selectionValue === 'outbound') this.history = this.getOutcomeHistory();
    if (this.selectionValue === 'all') this.history = this.geTransactionsHistory();

    return this.history
      .filter((t) => this.checkTime(new Date(t.timestamp).getTime(), timeEarlier, timeLater))
      .sort((t1, t2) => new Date(t2.timestamp).getTime() - new Date(t1.timestamp).getTime());
  }

  private checkTime(timestamp: number, timeEarlier: number, timeLater: number): boolean {
    return timestamp < timeLater && timestamp > timeEarlier;
  }

  supplyModel(t: Transaction): TransactionSupplier {
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

  getDescription(p: Panel, d: Date): string {
    switch (p.id) {
      // 00:00
      case 1: return `${this.dateService.objectifyDate(d).hour}:${this.dateService.objectifyDate(d).minute}`;
      // Monday, 00:00
      case 2: return `${this.dateService.getDayOfTheWeek(d)}, ${this.dateService.objectifyDate(d).hour}:${this.dateService.objectifyDate(d).minute}`;
      // 1st of Janury, 00:00
      case 3: return `${this.dateService.objectifyDate(d).day}${this.dateService.getDescriptor(d)} of ${this.dateService.getMonth(d)}, ${this.dateService.objectifyDate(d).hour}:${this.dateService.objectifyDate(d).minute}`;
      // 01.01.1970, 00:00
      case 4: return `${this.dateService.objectifyDate(d).day}.${this.dateService.objectifyDate(d).month}.${this.dateService.objectifyDate(d).year} ${this.dateService.objectifyDate(d).hour}:${this.dateService.objectifyDate(d).minute}`;
      default: return 'Invalid input';
    }
  }
}
