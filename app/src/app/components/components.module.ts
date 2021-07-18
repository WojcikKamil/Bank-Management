import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import MaterialModule from '../materials.module';
import TransactionBottomSheet from './bottom-sheets/transaction.bottom-sheet';
import MessageDialog from './dialogs/message.dialog';
import PersonalSettingsDialog from './dialogs/settings/personal/personal-settings.dialog';
import SettingsDialog from './dialogs/settings/settings.dialog';
import LoginComponent from './entry/login/login.component';
import RegisterComponent from './entry/register/register.component';
import AccountsListComponent from './home/accounts-list/accounts-list.component';
import HomeComponent from './home/home.component';
import NavbarComponent from './home/navbar/navbar.component';
import TransactionsListComponent from './home/transactionst-list/transactionts-list.component';
import UsersListComponent from './home/users-list/users-list.component';
import MessageSnackbar from './snackbars/message.snackbar';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MessageDialog,
    SettingsDialog,
    PersonalSettingsDialog,
    MessageSnackbar,
    AccountsListComponent,
    UsersListComponent,
    TransactionsListComponent,
    TransactionBottomSheet,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
})
export default class ComponentsModule {}
