import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from './api.service';
import User from '../models/user';
import Patch from '../models/patch';

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

  postUser(user: any): Observable<User> {
    return this.post<any, User>('/users', user);
  }

  deleteUser(id: number): Observable<void> {
    return this.delete<void>(`/users/${id}`);
  }

  putUser(user: User): Observable<User> {
    return this.put<User>('/users', user);
  }

  patchUser(request: Patch): Observable<User> {
    return this.patch<User>('/users', request);
  }

  attemptLogin(request: any): Observable<User> {
    return this.post<any, User>('/users/login', request);
  }

  attemptRegister(request: any): Observable<User> {
    return this.post<any, User>('/users/register', request);
  }
}
