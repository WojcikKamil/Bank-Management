import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import UserService from 'src/app/services/user.service';
import MessageDialog from '../../dialogs/message.dialog';
import RtValidators from '../../helpers/validation';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(63)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), RegisterComponent.checkPasswordRequirements]],
      passwordConfirm: ['', Validators.required],
    }, {
      validators: [RegisterComponent.checkPasswordsMatching],
    });
  }

  hidePasswords = true;

  get nameControl() {
    return this.registerForm.get('name');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get passwordConfirmControl() {
    return this.registerForm.get('passwordConfirm');
  }

  get nameErrorMessage() {
    if (this.nameControl?.hasError('required')) {
      return 'name is required';
    }

    if (this.nameControl?.hasError('name')) {
      return 'Please enter a valid name address';
    }

    if (this.nameControl?.hasError('notFromKmd')) {
      return 'name must be from kmd domain';
    }

    return '';
  }

  get passwordErrorMessage() {
    if (this.passwordControl!.hasError('required')) {
      return 'Please enter password';
    }

    if (this.passwordControl!.hasError('minlength')) {
      return 'Minimum lenght of a password is 8';
    }

    if (this.passwordControl!.hasError('maxlength')) {
      return 'Maximum lenght of a password is 100';
    }

    if (this.passwordControl!.hasError('noLowerCase')) {
      return 'Password must contain at least 1 lower case';
    }

    if (this.passwordControl!.hasError('noUpperCase')) {
      return 'Password must contain at least 1 upper case';
    }

    if (this.passwordControl!.hasError('noNumber')) {
      return 'Password must contain at least 1 digit';
    }

    return '';
  }

  get passwordConfirmErrorMessage(): string {
    if (this.passwordConfirmControl!.hasError('required') && this.passwordControl!.dirty) {
      return 'Please confirm your password';
    }

    if (this.passwordConfirmControl!.hasError('mismatchingPasswords') && this.passwordConfirmControl!.touched) {
      return 'Passwords are not matching';
    }

    return '';
  }

  static checkPasswordsMatching(control: AbstractControl) {
    const pass = control.get('password')!.value;
    const confirmPass = control.get('passwordConfirm')!.value;

    if (pass !== confirmPass) {
      control.get('passwordConfirm')!.setErrors({ mismatchingPasswords: true });
      return;
    }

    control.get('password')!.setErrors(null);
    control.get('password')!.updateValueAndValidity({ onlySelf: true });
  }

  static checkPasswordRequirements(control: AbstractControl) {
    if (control.value != null && !RtValidators.hasLowerCase(control.value)) {
      return { noLowerCase: true };
    }

    if (control.value != null && !RtValidators.hasUpperCase(control.value)) {
      return { noUpperCase: true };
    }

    if (control.value != null && !RtValidators.hasNumber(control.value)) {
      return { noNumber: true };
    }

    return null;
  }

  initializeRegisterRequest(): any {
  }
}
