import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import UserService from './services/user.service';

@Injectable({ providedIn: 'root' })
export default class AuthGuard implements CanActivate {
  constructor(private userService : UserService, private router: Router) { }

  canActivate() {
    if (!this.userService.isUserLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
