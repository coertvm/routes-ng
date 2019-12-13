import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Route } from './route';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private rsUrl: string = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) { }

  readAll(): Observable<Route[]> {
    return this.httpClient.get<Route[]>(this.rsUrl + '/routes')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  create(route: Route): Observable<Route> {
    return this.httpClient.post<Route>(this.rsUrl + '/routes', JSON.stringify(route), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  readOne(id): Observable<Route> {
    return this.httpClient.get<Route>(this.rsUrl + '/routes/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  update(route, id): Observable<Route> {
    return this.httpClient.put<Route>(this.rsUrl + '/routes/' + id, JSON.stringify(route), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  delete(id): Observable<Route> {
    return this.httpClient.delete<Route>(this.rsUrl + '/routes/' + id, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(`Error code ${error.status}: ${error.error}`);
    }
    return throwError('Error. Please try again.');
  }

}