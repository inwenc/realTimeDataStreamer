
import { Action } from '@ngrx/store'
import { Tweet } from '../Tweet'



export const ADD_TWEET = '[TWITTER] Add';
export const REMOVE_TWEET ='[TWITTER] Remove';


export class AddTweet implements Action {
  readonly type = ADD_TWEET;
  constructor(public payload: Tweet) {}
}



export class RemoveTweet implements Action {
  readonly type = REMOVE_TWEET;
  constructor(public payload: number) {}
}


export type Actions = AddTweet | RemoveTweet;


