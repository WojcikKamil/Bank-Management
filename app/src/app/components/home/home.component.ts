import { Component } from '@angular/core';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export default class HomeComponent {
  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((response) => {
      console.log(response);
    });
  }
}
