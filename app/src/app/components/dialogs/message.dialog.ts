import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string
  message: string
}

@Component({
  selector: 'message-dialog',
  templateUrl: 'message.dialog.html',
})
export default class MessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
