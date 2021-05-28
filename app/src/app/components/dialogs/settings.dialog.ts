import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import SessionStorage from 'src/app/helpers/session-storage';
import User from 'src/app/models/user';

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings.dialog.html',
  styleUrls: ['settings.dialog.scss'],
})
export default class SettingsDialog {
  constructor(private session: SessionStorage, private router: Router) {}

  get user(): User {
    return this.session.getCurrentUser();
  }

  logOut(): void {
    this.router.navigateByUrl('/login');
    this.session.logOutCurrentUser();
  }
}
