import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tweet } from './Tweet';
import { Observable, of, throwError} from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unkown error!';
    if (error.error instanceof ErrorEvent) {
      //Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //Server-side errors
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  searchTweets(term: string): Observable<Tweet[]> {
    let body = {
      title: term
    }
    let apiURL = 'http://localhost:3000/tweets';

    return this.http.post<Tweet[]>(apiURL, body).pipe(tap(_=> console.log('fetch tweets')),catchError(this.handleError))
  }
}
