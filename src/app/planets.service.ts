import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Planet } from './planet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private rsUrl: string = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) { }

  readAll(): Observable<Planet[]> {
    return this.httpClient.get<Planet[]>(this.rsUrl + '/planets')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  create(planet: Planet): Observable<Planet> {
    return this.httpClient.post<Planet>(this.rsUrl + '/planets', JSON.stringify(planet), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  readOne(id): Observable<Planet> {
    return this.httpClient.get<Planet>(this.rsUrl + '/planets/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  update(planet, id): Observable<Planet> {
    return this.httpClient.put<Planet>(this.rsUrl + '/planets/' + id, JSON.stringify(planet), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  delete(id): Observable<Planet> {
    return this.httpClient.delete<Planet>(this.rsUrl + '/planets/' + id, httpOptions)
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