import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import environment from '../../environments/environment';
import PatchRequest from '../requests/patch.request';

@Injectable({
  providedIn: 'root',
})
export default abstract class ApiService {
  protected abstract root: string;

  private headers!: {'Content-Type': 'application/json'};

  protected constructor(protected http: HttpClient) { }

  protected get<T>(actionUrl: string): Observable<T> {
    return this.http.get<T>(this.getEndpointUrl(actionUrl));
  }

  protected post<T, TOut>(actionUrl: string, data: T): Observable<TOut> {
    return this.http.post<TOut>(this.getEndpointUrl(actionUrl), data, {
      headers: this.headers,
    });
  }

  protected delete<T>(actionUrl: string): Observable<T> {
    return this.http.delete<T>(this.getEndpointUrl(actionUrl));
  }

  protected put<T>(actionUrl: string, data: T): Observable<T> {
    return this.http.put<T>(this.getEndpointUrl(actionUrl), data);
  }

  protected patch<T>(actionUrl: string, data: PatchRequest): Observable<T> {
    return this.http.patch<T>(this.getEndpointUrl(actionUrl), data);
  }

  protected getEndpointUrl(actionUrl: string): string {
    return `${environment.apiUrl}/${this.root}${actionUrl}`;
  }
}
