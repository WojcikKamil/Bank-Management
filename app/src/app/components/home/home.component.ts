import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import User from 'src/app/models/user';
import UserService from 'src/app/services/user.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export default class HomeComponent {
  constructor(private userService: UserService) {}

  hello(): string {
    return this.userService.getCurrentUser()!.name;
  }

  isExpanded: boolean = false;
}
