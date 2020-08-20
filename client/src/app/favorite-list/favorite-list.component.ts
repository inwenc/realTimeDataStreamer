import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Tweet } from '../Tweet';
import { AppState } from '../app.state';
import * as TwitterActions from '../actions/twitter.actions';



@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  favoriteTweets: Observable<Tweet[]>;

  constructor(private store: Store<AppState>) {
    this.favoriteTweets = store.select('tweet');
   }

  ngOnInit(): void {
  }
  deleteTweet (idx: number) {
    this.store.dispatch(new TwitterActions.RemoveTweet(idx));
    console.log('index', idx)
  }

}
