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

  public storage: Array<Object> = [];

  constructor(private webSocketService: WebSocketService) {

  }
  ngOnInit() {
    this.webSocketService.listen('streamer').subscribe((data:any) => {
      this.storage.push(data);
    })
  }

}
