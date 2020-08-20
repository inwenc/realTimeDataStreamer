import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as TwitterActions from '../actions/twitter.actions';


import { Tweet } from '../Tweet';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tweets$: Observable<Tweet[]> | undefined;
  private loading: boolean = false;
  private searchTerms = new Subject<string>();
  public listOfTweets: Array<Object> = [];


  constructor(private apiService: ApiService, private store: Store<AppState>) { }

  ngOnInit(): void {

   this.tweets$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.apiService.searchTweets(term)),


    )

  }


  search(term: string) {
   this.searchTerms.next(term);
   console.log('termi', term)
   this.loading = true;
   this.apiService.searchTweets(term).subscribe((data)=> this.listOfTweets = data);

  }

  addToFavorite(id: string, text: string, time: string, idx: number) {
    this.store.dispatch(new TwitterActions.AddTweet({id: id, text: text, time: time,idx:idx}))

  }

}
