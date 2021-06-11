import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';
import PersonalSettingsDialog from './personal/personal-settings.dialog';

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings.dialog.html',
  styleUrls: ['settings.dialog.scss'],
})
export default class SettingsDialog {
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  get user(): User {
    return this.userService.getCurrentUser()!;
  }

  goToPersonalSettings(): void {
    this.dialog.open(PersonalSettingsDialog, { data: this.user });
  }

  logOut(): void {
    this.router.navigateByUrl('/login');
    this.userService.logOutCurrentUser();
  }
}
