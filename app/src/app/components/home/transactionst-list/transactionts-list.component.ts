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
  timeFrom: number,
  timeTo: number,
  display: boolean,
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

    await this.accountService.initUserAccounts(this.currentUser.id);
    await this.transactionService.initTransactionsList(this.selectedAccount!.id);
  }

  private panelsInit: Panel[] = [
    {
      id: 1,
      displayValue: 'From past 24 hours',
      timeFrom: new Date().getTime(),
      timeTo: new Date().getTime() - 86400000,
      display: true,
    },
    {
      id: 2,
      displayValue: 'From past 7 days',
      timeFrom: new Date().getTime() - 86400000,
      timeTo: new Date().getTime() - 604800000,
      display: true,
    },
    {
      id: 3,
      displayValue: 'From past month',
      timeFrom: new Date().getTime() - 604800000,
      timeTo: new Date().getTime() - 2629800000,
      display: true,
    },
    {
      id: 3,
      displayValue: 'From past 3 months',
      timeFrom: new Date().getTime() - 2629800000,
      timeTo: new Date().getTime() - 7889400000,
      display: true,
    },
    {
      id: 4,
      displayValue: 'Older than 3 months',
      timeFrom: new Date().getTime() - 7889400000,
      timeTo: 0,
      display: true,
    },
  ]

  get panels() {
    return this.panelsInit.filter((p) => p.display === true) || [];
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

  history: Transaction[] = [];

  getFilteredTransactions(panel: any): Transaction[] {
    if (this.selectionValue === 'inbound') this.history = this.getIncomeHistory();
    if (this.selectionValue === 'outbound') this.history = this.getOutcomeHistory();
    if (this.selectionValue === 'all') this.history = this.geTransactionsHistory();

    return this.history
      .filter((t) => this.checkTime(t, panel))
      .sort((t1, t2) => new Date(t2.timestamp).getTime() - new Date(t1.timestamp).getTime());
  }

  private checkTime(transaction: Transaction, panel: Panel): boolean {
    const today = new Date(transaction.timestamp).getTime();
    const display = today < panel.timeFrom && today > panel.timeTo;

    if (this.panels[this.panels.indexOf(panel)] !== undefined) {
      this.panels[this.panels.indexOf(panel)].display = display;
    }
    return display;
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
