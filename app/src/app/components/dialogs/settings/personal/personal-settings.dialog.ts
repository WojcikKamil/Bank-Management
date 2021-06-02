import { isNotNullOrUndefined } from '@angular-eslint/eslint-plugin/dist/utils/utils';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import SessionStorage from 'src/app/helpers/session-storage';
import RtValidators from 'src/app/helpers/validation';
import Patch from 'src/app/models/patch';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';
import SettingsDialog from '../settings.dialog';

@Component({
  selector: 'personal-settings-dialog',
  templateUrl: 'personal-settings.dialog.html',
  styleUrls: ['personal-settings.dialog.scss'],
})
export default class PersonalSettingsDialog implements OnInit {
  personalForm!: FormGroup;

  constructor(
    private session: SessionStorage,
    private service: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  get currentUser(): User {
    return this.session.getCurrentUser();
  }

  ngOnInit(): void {
    this.personalForm = this.formBuilder.group({
      login: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      name: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      surname: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), PersonalSettingsDialog.checkPasswordRequirements]],
      passwordConfirm: ['', Validators.required],
    }, {
      validators: [PersonalSettingsDialog.checkPasswordsMatching],
    });
  }

  selectedTab = new FormControl(0);

  get nameControl() {
    return this.personalForm.get('name');
  }

  get surnameControl() {
    return this.personalForm.get('surname');
  }

  get passwordControl() {
    return this.personalForm.get('password');
  }

  get passwordConfirmControl() {
    return this.personalForm.get('passwordConfirm');
  }

  get loginControl() {
    return this.personalForm.get('login');
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control!.hasError('required')) return 'Field must not be empty';
    if (control!.hasError('minlength')) return 'Value too short';
    if (control!.hasError('maxlength')) return 'Value too long';
    if (control!.hasError('noLowerCase')) return 'Password must contain at least 1 lower case';
    if (control!.hasError('noUpperCase')) return 'Password must contain at least 1 upper case';
    if (control!.hasError('noNumber')) return 'Password must contain at least 1 digit';
    if (control!.hasError('mismatchingPasswords')) return 'Passwords do not match';
    return '';
  }

  hidePasswords = true;

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
    if (control.value !== '' && !RtValidators.hasLowerCase(control.value)) {
      return { noLowerCase: true };
    }

    if (control.value !== '' && !RtValidators.hasUpperCase(control.value)) {
      return { noUpperCase: true };
    }

    if (control.value !== '' && !RtValidators.hasNumber(control.value)) {
      return { noNumber: true };
    }

    return null;
  }

  edit(control: AbstractControl|null) {
    control!.enable();
  }

  lock(control: AbstractControl|null) {
    control?.setValue('');
    control!.disable();
  }

  confirm(control: AbstractControl|null, property: string) {
    const userToPatch = {
      id: this.currentUser.id,
      property,
      value: control?.value,
    };
    this.service.patchUser(userToPatch).subscribe((response) => {
      this.session.setCurrentUser(response);
      if (property.toLowerCase() !== 'password') this.lock(control);
    });
  }

  back() {
    this.dialog.open(SettingsDialog);
  }

  get selectedTabLabel(): string {
    return this.selectedTab.value === 0 ? 'Change password' : 'Check credentials';
  }

  toggleTab() {
    if (this.selectedTab.value === 0) {
      this.selectedTab.setValue(1);
    } else {
      this.passwordControl?.setValue('');
      this.passwordConfirmControl?.setValue('');
      this.selectedTab.setValue(0);
    }
    this.passwordControl?.setErrors(null);
    this.passwordConfirmControl?.setErrors(null);
  }
}
