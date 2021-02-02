import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Subscription} from 'rxjs';
import {Room} from '../model/room';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public rooms: Room[] = [];

  constructor( public chatService: ChatService) {
  }

  ngOnInit(): void {
    // this.roomService.getRoomList().subscribe();

    const roomSub = this.chatService.roomList.subscribe((data) => {
      if (data === null) {
        return;
      }

      this.rooms = data;
    });

    this.subscriptions.push(
      roomSub
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  enterToRoom(roomId: string): void {
    this.chatService.enterToRoom(roomId);
  }

}
