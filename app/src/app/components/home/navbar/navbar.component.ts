import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import SessionStorage from 'src/app/helpers/session-storage';
import User from 'src/app/models/user';
import SettingsDialog from '../../dialogs/settings/settings.dialog';

@Component({
  selector: 'navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export default class NavbarComponent {
  constructor(
      private session: SessionStorage,
      private dialog: MatDialog,
  ) {}

  get isLoggedIn(): boolean {
    return this.session.isUserLogged();
  }

  get user(): User {
    return this.session.getCurrentUser();
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialog);
  }
}
