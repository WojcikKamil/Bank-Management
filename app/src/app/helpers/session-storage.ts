import { Input } from '@angular/core';
import User from 'src/app/models/user';

export default class SessionStorage {
  getCurrentUser() : User {
    return JSON.parse(sessionStorage.getItem('current-user') as string) as User;
  }

  setCurrentUser(user: User) : void {
    sessionStorage.setItem('current-user', JSON.stringify(user));
  }

  logOutCurrentUser() : void {
    sessionStorage.removeItem('current-user');
  }

  isUserLogged() : boolean {
    if (sessionStorage.getItem('current-user') === null) {
      return false;
    }
    return true;
  }
}
