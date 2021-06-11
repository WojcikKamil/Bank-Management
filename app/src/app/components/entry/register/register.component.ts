import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import RtValidators from 'src/app/helpers/validation';
import RegisterUserRequest from 'src/app/requests/register-user.request';
import UserService from 'src/app/services/user.service';
import MessageDialog from '../../dialogs/message.dialog';

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
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), RegisterComponent.checkPasswordRequirements]],
      passwordConfirm: ['', Validators.required],
      isBanker: [false, Validators.required],
    }, {
      validators: [RegisterComponent.checkPasswordsMatching],
    });
  }

  hidePasswords = true;

  get nameControl() {
    return this.registerForm.get('name');
  }

  get surnameControl() {
    return this.registerForm.get('surname');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get passwordConfirmControl() {
    return this.registerForm.get('passwordConfirm');
  }

  get isBankerControl() {
    return this.registerForm.get('isBanker');
  }

  get nameErrorMessage() {
    if (this.nameControl!.hasError('required')) {
      return 'Name is required';
    }

    if (this.nameControl!.hasError('minlength')) {
      return 'Minimum length of a name is 2';
    }

    if (this.nameControl!.hasError('maxlength')) {
      return 'Maximum length of a name is 100';
    }

    return '';
  }

  get surnameErrorMessage() {
    if (this.surnameControl!.hasError('required')) {
      return 'Surname is required';
    }

    if (this.surnameControl!.hasError('minlength')) {
      return 'Minimum length of a surname is 2';
    }

    if (this.surnameControl!.hasError('maxlength')) {
      return 'Maximum length of a surname is 100';
    }

    return '';
  }

  get passwordErrorMessage() {
    if (this.passwordControl!.hasError('required')) {
      return 'Please enter password';
    }

    if (this.passwordControl!.hasError('minlength')) {
      return 'Minimum length of a password is 4';
    }

    if (this.passwordControl!.hasError('maxlength')) {
      return 'Maximum length of a password is 100';
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

  async initializeRegisterRequest() {
    const registerRequest: RegisterUserRequest = {
      name: this.nameControl?.value,
      surname: this.surnameControl?.value,
      password: this.passwordControl?.value,
      isBanker: this.isBankerControl?.value,
    };

    await this.userService
      .attemptRegister(registerRequest)
      .then(
        (onfulfilled) => {
          this.dialog.open(MessageDialog, {
            data: {
              title: 'Congratulation!',
              message: `Welcome, ${onfulfilled.name}. You may now log in using your login: ${onfulfilled.login}`,
            },
          });
          this.router.navigateByUrl('/login');
        },
        (onrejected) => {
          this.dialog.open(MessageDialog, {
            data: {
              title: 'Error',
              message: onrejected,
            },
          });
        },
      );
  }
}
