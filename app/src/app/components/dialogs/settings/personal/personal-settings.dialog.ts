import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import SessionStorage from 'src/app/helpers/session-storage';
import RtValidators from 'src/app/helpers/validation';
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
    @Inject(MAT_DIALOG_DATA) public data: User,
    private service: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

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
    });
  }

  selectedTab = new FormControl(0);

  get nameControl() {
    return this.personalForm.get('name');
  }

  get surnameControl() {
    return this.personalForm.get('surname');
  }

  get loginControl() {
    return this.personalForm.get('login');
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control!.hasError('required')) return 'Field must not be empty';
    if (control!.hasError('minlength')) return 'Value too short';
    if (control!.hasError('maxlength')) return 'Value too long';
    return '';
  }

  edit(control: AbstractControl|null) {
    control!.enable();
  }

  cancel(control: AbstractControl|null) {
    control?.setValue('');
    control!.disable();
  }

  confirm(control: AbstractControl|null) {
    console.log(control?.value);
  }

  back() {
    this.dialog.open(SettingsDialog);
  }

  get selectedTabLabel(): string {
    return this.selectedTab.value === 0 ? 'Change password' : 'Check credentials';
  }

  toggleTab() {
    if (this.selectedTab.value === 0) this.selectedTab.setValue(1);
    else this.selectedTab.setValue(0);
  }
}
