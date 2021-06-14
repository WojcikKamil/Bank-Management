import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'transaction-bottom-sheet',
  templateUrl: 'transaction.bottom-sheet.html',
  styleUrls: ['transaction.bottom-sheet.scss'],
})
export default class TransactionBottomSheet implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    // Removing the background of the backdrop, and thus unlocking it
    document.querySelector('.cdk-overlay-backdrop')!.classList.remove('cdk-overlay-backdrop');
  }
}
