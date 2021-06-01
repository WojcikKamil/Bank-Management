import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import MaterialModule from '../materials.module';
import MessageDialog from './dialogs/message.dialog';
import PersonalSettingsDialog from './dialogs/settings/personal/personal-settings.dialog';
import SettingsDialog from './dialogs/settings/settings.dialog';
import LoginComponent from './entry/login/login.component';
import RegisterComponent from './entry/register/register.component';
import HomeComponent from './home/home.component';
import NavbarComponent from './home/navbar/navbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MessageDialog,
    SettingsDialog,
    PersonalSettingsDialog,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
})
export default class ComponentsModule {}
