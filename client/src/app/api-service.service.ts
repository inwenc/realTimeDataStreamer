import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import TWITTER_TOKEN from '../../../server/config.js';
import { Tweet } from './Tweet';
import { Observable, of, throwError} from 'rxjs'
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private token: string = `Bearer ${TWITTER_TOKEN}`;

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
    const headers = new HttpHeaders({Authorization: `Bearer ${TWITTER_TOKEN}`})

    let apiURL = `https://api.twitter.com/1.1/search/tweets.json?q=%23${term}l&result_type=recent`;

    return this.http.get<Tweet[]>(apiURL, {headers: headers}).pipe(catchError(this.handleError))
  }
}
