import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  readonly url: string = 'ws://localhost:3001';

  constructor() {
    this.socket = io(this.url, { withCredentials: false });
  }
  socket: any;
  listen(eventName: string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        console.log('data', data)
        subscriber.next(data);
      })
    })
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
