import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-real-time-data',
  templateUrl: './real-time-data.component.html',
  styleUrls: ['./real-time-data.component.css']
})
export class RealTimeDataComponent implements OnInit {

  title = 'client';
  constructor(private webSocketService: WebSocketService) {

  }
  ngOnInit() {
    this.webSocketService.listen('twitter').subscribe((data) => {
      console.log(data);
    })
  }

}
