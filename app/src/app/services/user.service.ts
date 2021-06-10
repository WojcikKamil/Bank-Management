import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }

  patchUser(request: PatchRequest): Observable<User> {
    return this.patch<User>('/users', request);
  }

  getUser(id: number): Observable<User> {
    return this.get<User>(`users/${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.delete<void>(`/users/${id}`);
  }

  attemptRegister(request: RegisterUserRequest): Observable<User> {
    return this.post<any, User>('/users/register', request);
  }

  attemptLogin(request: LoginUserRequest): Observable<User> {
    return this.post<any, User>('/users/login', request);
  }
}
