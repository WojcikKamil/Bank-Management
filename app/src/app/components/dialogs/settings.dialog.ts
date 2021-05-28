import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from 'src/app/models/user';

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings.dialog.html',
  styleUrls: ['settings.dialog.scss'],
})
export default class SettingsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}

  get user(): User {
    return this.data;
  }
}
