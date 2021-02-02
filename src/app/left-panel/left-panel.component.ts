import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Room} from '../model/room';
import {Message} from '../model/message';
import {UserInfo} from '../model/user-info';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public subscriptions: Subscription[] = [];
  public room: Room = null;
  public newMessage: string;

  constructor(public chatService: ChatService) {
  }

  ngOnInit(): void {
    const roomSub = this.chatService.room.subscribe((data) => {
      this.room = data;

      console.log(data);
    });

    const receiveMessageSub = this.chatService.receiveMessage.subscribe((data) => {
      if (data === null) {
        return;
      }

      this.receiveMessage(data);
    });

    const userEnteredSub = this.chatService.userJoined.subscribe((data) => {
      if (data === null) {
        return;
      }

      this.userJoined(data);
    });

    const userLeftSub = this.chatService.userLeft.subscribe((data) => {
      if (data === null) {
        return;
      }

      this.userLeft(data);
    });

    this.subscriptions.push(
      roomSub, receiveMessageSub, userEnteredSub, userLeftSub
    );
  }

  ngAfterViewChecked(): void {
    if (this.myScrollContainer) {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.chatService.sendMessage(this.newMessage);

    this.newMessage = '';
  }

  receiveMessage(message: Message): void {
    this.room.messages.push(message);
  }

  userJoined(user: UserInfo): void {
    const message = new Message();
    message.message = 'User Joined : ' + user.nickName;
    message.isAnnouncement = true;

    this.room.messages.push(message);
  }

  userLeft(user: UserInfo): void {
    const message = new Message();
    message.message = 'User Left : ' + user.nickName;
    message.isAnnouncement = true;

    this.room.messages.push(message);
  }
}
