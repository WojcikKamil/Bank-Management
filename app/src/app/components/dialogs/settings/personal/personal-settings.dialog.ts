import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import SessionStorage from 'src/app/helpers/session-storage';
import RtValidators from 'src/app/helpers/validation';
import User from 'src/app/models/user';
import PatchRequest from 'src/app/requests/patch.request';
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
    private snackBar: MatSnackBar,
  ) {}

  get currentUser(): User {
    return this.session.getCurrentUser();
  }

  ngOnInit(): void {
    this.personalForm = this.formBuilder.group({
      login: [
        { value: '', disabled: true },
        [Validators.required,
          PersonalSettingsDialog.validatorBanker, PersonalSettingsDialog.validatorNonBanker]],
      name: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      surname: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100),
        PersonalSettingsDialog.checkPasswordRequirements]],
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
    if (control!.hasError('mustOnlyContainNumbers')) return 'Login must only contain numbers';
    if (control!.hasError('maxLength8')) return 'Login must contain exactly 8 characters';
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

  static validatorNonBanker(control: AbstractControl) {
    const session = new SessionStorage();
    if (!session.getCurrentUser().isBanker && control.value !== '') {
      if (RtValidators.onlyHasNumbers(control.value)) return { mustOnlyContainNumbers: true };

      if (control.value.length !== 8) return { maxLength8: true };
    }

    return null;
  }

  static validatorBanker(control: AbstractControl) {
    const session = new SessionStorage();
    if (session.getCurrentUser().isBanker && control.value !== '') {
      if (control.value.length < 2) return { minlength: true };

      if (control.value.length > 100) return { maxlength: true };
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
    const patchRequest: PatchRequest = {
      id: this.currentUser.id,
      property,
      value: control?.value,
    };
    this.service.patchUser(patchRequest).subscribe((response) => {
      this.session.setCurrentUser(response);
      if (property.toLowerCase() !== 'password') this.lock(control);
      this.openConfirmationSnackBar(property, patchRequest.value);
    });
  }

  openConfirmationSnackBar(property: string, value: string) {
    let message: string;
    if (property.toLowerCase() === 'password') message = 'Your password has been changed successfully!';
    else message = `Success! Your new ${property}: ${value}!`;
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
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
