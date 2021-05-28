import { Component } from '@angular/core';
import SessionStorage from 'src/app/helpers/session-storage';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export default class HomeComponent {
  constructor(private session: SessionStorage) {}

  hello(): string {
    return this.session.getCurrentUser().name;
  }
}
