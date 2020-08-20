import { Action } from '@ngrx/store';
import { Tweet } from '../Tweet';
import * as TwitterActions from '../actions/twitter.actions';


const initialState: Tweet = {
  time: '02/02/02',
  text: 'hola',
  id: '0001',
  idx: 0
}


export function twitterReducer(state: Tweet[] = [initialState], action: TwitterActions.Actions) {
  switch(action.type) {
    case TwitterActions.ADD_TWEET:
      return [...state, action.payload];
    case TwitterActions.REMOVE_TWEET:
      state.splice(action.payload, 1)
      return state;
      default:
        return state;
  }
}