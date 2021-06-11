import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounceTime, map } from 'rxjs/operators';
import environment from '../../environments/environment';
import PatchRequest from '../requests/patch.request';

@Injectable({
  providedIn: 'root',
})
export default abstract class ApiService {
  protected abstract root: string;

  private headers!: {'Content-Type': 'application/json'};

  private debounceTimer: number = 1000000;

  protected constructor(protected http: HttpClient) { }

  protected get<T>(actionUrl: string): Observable<T> {
    return this.http.get<T>(this.getEndpointUrl(actionUrl));
  }

  protected post<T, TOut>(actionUrl: string, data: T, debounce = this.debounceTimer)
    : Observable<TOut> {
    return this.http.post<TOut>(this.getEndpointUrl(actionUrl), data, {
      headers: this.headers,
    }).pipe(debounceTime(debounce));
  }

  protected delete<T>(actionUrl: string, debounce = this.debounceTimer): Observable<T> {
    return this.http.delete<T>(this.getEndpointUrl(actionUrl)).pipe(debounceTime(debounce));
  }

  protected put<T>(actionUrl: string, data: T, debounce = this.debounceTimer): Observable<T> {
    return this.http.put<T>(this.getEndpointUrl(actionUrl), data).pipe(debounceTime(debounce));
  }

  protected patch<T>(actionUrl: string, data: any, debounce = this.debounceTimer)
  : Observable<T> {
    return this.http.patch<T>(this.getEndpointUrl(actionUrl), data).pipe(debounceTime(debounce));
  }

  protected getEndpointUrl(actionUrl: string): string {
    return `${environment.apiUrl}/${this.root}${actionUrl}`;
  }
}
