import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import LoginUserRequest from 'src/app/requests/login-user.request';
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
      login: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(63)]],
    });
    this.userService.logOutCurrentUser();
  }

  get loginControl() {
    return this.loginForm.get('login');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get loginErrorMessage() {
    if (this.loginControl?.hasError('required')) {
      return 'Login is required';
    }

    if (this.loginControl?.hasError('minlength')) {
      return 'Login may only have 8 characters';
    }

    if (this.loginControl?.hasError('maxlength')) {
      return 'Login may only have 8 characters';
    }

    return '';
  }

  get passwordErrorMessage() {
    if (this.passwordControl?.hasError('required')) {
      return 'Please enter password';
    }

    if (this.passwordControl?.hasError('minlength')) {
      return 'Reminder: minimum lenght is 4';
    }

    if (this.passwordControl?.hasError('maxlength')) {
      return 'Reminder: maximum lenght is 100';
    }

    return '';
  }

  async login() {
    const loginRequest: LoginUserRequest = {
      login: this.loginControl!.value,
      password: this.passwordControl!.value,
    };

    await this.userService
      .attemptLogin(loginRequest)
      .then(
        (onfulfilled) => this.router.navigateByUrl('/home'),
        (onrejected) => this.dialog.open(MessageDialog, {
          data: {
            title: 'Login failed',
            message: onrejected,
          },
        }),
      );
  }
}
