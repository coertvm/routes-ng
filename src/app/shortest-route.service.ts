import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Route } from './route';
import { SchemaConverter } from './schema-converter';

const httpHeaders = new HttpHeaders({
    'Content-Type': 'text/xml'
  });

@Injectable({
  providedIn: 'root'
})
export class ShortestRouteService {

  private rsUrl: string = 'http://localhost:8080';
  private schemaConverter: SchemaConverter = new SchemaConverter();

  constructor(
    private httpClient: HttpClient
  ) { }

  getRoutes(route: Route): Observable<Route[]> {

    let routeXml: string = this.schemaConverter.fromRoute(route);
    let getRoutesRequestXml: string = this.schemaConverter.formatGetRoutesRequest(routeXml);
    let envelopeXml: string = this.schemaConverter.formatEnvelope(getRoutesRequestXml);
    console.log('REQUEST: ' + envelopeXml);
  
    const routesObservable = new Observable<Route[]>((observer) => {
      this.httpClient.post(this.rsUrl + '/ws', envelopeXml,
          {headers: httpHeaders, responseType: 'text'})
        .subscribe(response => {
          console.log('RESPONSE: ' + response);
          let routes: Route[] = new Array<Route>();
          let responseDom: Document = this.schemaConverter.marshall(response);
          let routeElements: XPathResult = this.schemaConverter.elements(responseDom,
            '/s:Envelope/s:Body/r:getRoutesResponse/r:route');
          if (routeElements != null) {
            let routeElement = routeElements.iterateNext();
            while (routeElement) {
              let route: Route = this.schemaConverter.toRoute(routeElement, responseDom);
              routes.push(route);
              routeElement = routeElements.iterateNext();
            }
          }
          observer.next(routes);
        }, error => {
          catchError(this.handleError)
        });
      return {unsubscribe() {}};
    });
    return routesObservable;
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