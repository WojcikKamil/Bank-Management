import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from './api.service';
import User from '../models/user';
import PatchRequest from '../requests/patch.request';
import RegisterUserRequest from '../requests/register-user.request';
import LoginUserRequest from '../requests/login-user.request';

@Injectable({
  providedIn: 'root',
})
export default class UserService extends ApiService {
  protected root = 'api';

  private currentUser?: User;

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getCurrentUser(): User|undefined {
    return this.currentUser;
  }

  async attemptRegister(request: RegisterUserRequest): Promise<User> {
    return new Promise((resolve, reject) => {
      this.register(request).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error.error);
        },
      );
    });
  }

  async attemptLogin(request: LoginUserRequest): Promise<User> {
    return new Promise((resolve, reject) => {
      this.login(request).subscribe(
        (response) => {
          this.currentUser = response;
          resolve(response);
        },
        (error) => {
          reject(new Error(error.error));
        },
      );
    });
  }

  async attemptPatch(request: PatchRequest): Promise<User> {
    return new Promise((resolve, reject) => {
      this.patchUser(request).subscribe(
        (response) => {
          this.currentUser = response;
          resolve(response);
        },
        (error) => {
          reject(error.error);
        },
      );
    });
  }

  isUserLogged(): boolean {
    return this.currentUser !== undefined;
  }

  logOutCurrentUser() {
    this.currentUser = undefined;
  }

  private getAllUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }

  private patchUser(request: PatchRequest): Observable<User> {
    return this.patch<User>('/users', request);
  }

  private getUser(id: number): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }

  private deleteUser(id: number): Observable<void> {
    return this.delete<void>(`/users/${id}`);
  }

  private register(request: RegisterUserRequest): Observable<User> {
    return this.post<any, User>('/users/register', request);
  }

  private login(request: LoginUserRequest): Observable<User> {
    return this.post<any, User>('/users/login', request);
  }
}
