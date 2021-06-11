import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';
import SettingsDialog from '../../dialogs/settings/settings.dialog';

@Component({
  selector: 'navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export default class NavbarComponent {
  constructor(
      private userService: UserService,
      private dialog: MatDialog,
      private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/logo.svg'),
    );
  }

  get isLoggedIn(): boolean {
    return this.userService.isUserLogged();
  }

  get user(): User {
    return this.userService.getCurrentUser()!;
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialog);
  }
}
