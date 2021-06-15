import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import RtValidators from 'src/app/helpers/validation';
import Account from 'src/app/models/account';
import TransferRequest from 'src/app/requests/transfer.requests';
import AccountService from 'src/app/services/account.service';
import TransactionService from 'src/app/services/transaction.service';

@Component({
  selector: 'transaction-bottom-sheet',
  templateUrl: 'transaction.bottom-sheet.html',
  styleUrls: ['transaction.bottom-sheet.scss'],
})
export default class TransactionBottomSheet implements OnInit, AfterViewInit {
  transactionForm!: FormGroup;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      title: [this.lastTransactionTitle ?? '', [Validators.required]],
      amount: [this.lastTransactionAmount ?? '', [Validators.required, TransactionBottomSheet.moneyValidator]],
      sender: [this.selectedAccount ?? '', [Validators.required]],
      receiver: [this.targetAccount ?? '', [Validators.required]],
    });
  }

  async ngAfterViewInit() {
    // Removing the background of the backdrop, and thus unlocking it
    document.querySelector('.cdk-overlay-backdrop')!.classList.remove('cdk-overlay-backdrop');
  }

  get titleControl(): AbstractControl {
    return this.transactionForm.get('title')!;
  }

  get amountControl(): AbstractControl {
    return this.transactionForm.get('amount')!;
  }

  get senderControl(): AbstractControl {
    return this.transactionForm.get('sender')!;
  }

  get receiverControl(): AbstractControl {
    return this.transactionForm.get('receiver')!;
  }

  get source(): string {
    return this.senderControl.value.number ?? 'SOURCE';
  }

  get target(): string {
    return this.receiverControl.value.number ?? 'TARGET';
  }

  get selectedAccount(): Account|undefined {
    return this.accountService.getSelectedAccount();
  }

  get targetAccount(): Account|undefined {
    return this.accountService.getTargetAccount();
  }

  get lastTransactionTitle(): string|undefined {
    return this.transactionService.getLastTransactionTitle();
  }

  get lastTransactionAmount(): number|undefined {
    return this.transactionService.getLastTransactionAmount();
  }

  static moneyValidator(control: AbstractControl) {
    if (control.value !== '' && !RtValidators.money(control.value)) {
      return { money: true };
    }
    return null;
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    return true;
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control!.hasError('required')) return 'Field must not be empty';
    if (control!.hasError('minlength')) return 'Value too short';
    if (control!.hasError('maxlength')) return 'Value too long';
    if (control!.hasError('money')) return 'This is not a valid ';
    return '';
  }

  initializeTargetSelection() {
    this.accountService.enableAccountSelectionMode();
    this.transactionService.setLastTransactionAmount(this.amountControl.value);
    this.transactionService.setLastTransactionTitle(this.titleControl.value);
    this.bottomSheet.dismiss();
  }

  close() {
    this.accountService.clearTargetAccount();
    this.transactionService.clearLastTransactionValues();
    this.bottomSheet.dismiss();
  }

  async confirm() {
    const request: TransferRequest = {
      title: this.titleControl.value,
      amount: +this.amountControl.value,
      senderNumber: this.senderControl.value.number,
      receiverNumber: this.receiverControl.value.number,
    };
    await this.transactionService.transferFunds(request)
      .then((onfulfilled) => {
        this.accountService.clearTargetAccount();
        this.accountService.updateUserAccounts();
        this.bottomSheet.dismiss();
        this.snackBar.open('Transaction successful!', '', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary'],
          horizontalPosition: 'left',
        });
      }, (onrejected) => {
        this.snackBar.open(onrejected, '', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
          horizontalPosition: 'left',
        });
      });
  }
}
