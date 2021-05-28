import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import SessionStorage from './helpers/session-storage';

@Injectable({ providedIn: 'root' })
export default class AuthGuard implements CanActivate {
  constructor(private session : SessionStorage, private router: Router) { }

  canActivate() {
    if (!this.session.isUserLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
