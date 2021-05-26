import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import MaterialModule from '../materials.module';
import MessageDialog from './dialogs/message.dialog';
import LoginComponent from './entry/login/login.component';
import RegisterComponent from './entry/register/register.component';
import HomeComponent from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MessageDialog,
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
