import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import UserService from 'src/app/services/user.service';
import MessageDialog from '../../dialogs/message.dialog';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(63)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(63)]],
    });
  }

  get nameControl() {
    return this.loginForm.get('name');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get nameErrorMessage() {
    if (this.nameControl?.hasError('required')) {
      return 'Name is required';
    }

    if (this.nameControl?.hasError('minlength')) {
      return 'Reminder: minimum lenght is 8';
    }

    if (this.nameControl?.hasError('maxlength')) {
      return 'Reminder: maximum lenght is 63';
    }

    return '';
  }

  get passwordErrorMessage() {
    if (this.passwordControl?.hasError('required')) {
      return 'Please enter password';
    }

    if (this.passwordControl?.hasError('minlength')) {
      return 'Reminder: minimum lenght is 8';
    }

    if (this.passwordControl?.hasError('maxlength')) {
      return 'Reminder: maximum lenght is 63';
    }

    return '';
  }

  login() {
  }
}
