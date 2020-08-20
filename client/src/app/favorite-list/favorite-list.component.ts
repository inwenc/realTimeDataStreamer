import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Tweet } from '../Tweet';
import { AppState } from '../app.state';


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

}
