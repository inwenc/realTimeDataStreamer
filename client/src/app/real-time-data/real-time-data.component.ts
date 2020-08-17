import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-real-time-data',
  templateUrl: './real-time-data.component.html',
  styleUrls: ['./real-time-data.component.css']
})
export class RealTimeDataComponent implements OnInit {

  title = 'client';

  //$messages = [];
  public storage: Array<Object> = [];
  //public tweet: any;
  constructor(private webSocketService: WebSocketService) {

  }
  ngOnInit() {
    this.webSocketService.listen('twitter').subscribe((data:any) => {
     // let newData = JSON.parse(data);
     // console.log('newData', data)
    //  let newData = { data }
     //this.tweet = data;

    this.storage.push(data)
    // if (this.storage.length !== 0) {
    //   this.storage = this.storage.shift()
    // }
    console.log(this.storage)
    })
  }

}
