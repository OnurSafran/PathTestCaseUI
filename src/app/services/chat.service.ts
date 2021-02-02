import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {environment} from '../../environments/environment';
import {UserInfo} from '../model/user-info';
import {BehaviorSubject} from 'rxjs';
import {LoadingService} from './loading.service';
import {Message} from '../model/message';
import {Room} from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public hubConnection: signalR.HubConnection;
  public connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public receiveMessage: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
  public userJoined: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  public userLeft: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  public roomList: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(null);
  public room: BehaviorSubject<Room> = new BehaviorSubject<Room>(null);
  public currentUser = new UserInfo();

  constructor(public loadingService: LoadingService) {
  }

  public startConnection(nickName: string): void {
    this.loadingService.startLoading(); // Start here. Ends in login or on error

    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.hubUrl)
      .build();

    this.hubConnection.onclose((data) => {
      console.log(data);

      this.clear();
    });

    this.hubConnection.start().then(() => {
      console.log('Connection Started.');

      this.login(nickName);
    }).catch((err) => {
      console.log('Connection Error. ' + err);

      this.connected.next(false);

      this.loadingService.stopLoading();
    });
  }

  public stopConnection(): void {
    this.hubConnection.stop().then(() => {
      console.log('Connection Stopped.');

      this.clear();
    });
  }

  public clear(): void {
    this.currentUser = new UserInfo();
    this.room.next(null);
    this.connected.next(false);

    this.removeReceiveMessageListener();
    this.removeUserJoinedListener();
    this.removeUserLeftListener();
  }

  private login(nickName: string): void {
    this.currentUser.nickName = nickName;

    this.hubConnection.invoke('OnConnect', nickName).then((data) => {
      console.log('Login.');

      this.roomList.next(data);
      this.connected.next(true);

      this.loadingService.stopLoading();
    }).catch((err) => {
      console.log('Login Error. ' + err);

      this.connected.next(false);
      this.currentUser.nickName = null;

      this.loadingService.stopLoading();
    });
  }

  public logout(): void {
    this.clear();

    this.hubConnection.invoke('OnDisconnect').then(() => {
      console.log('Logout.');
    }).catch((err) => {
      console.log('Logout Error. ' + err);
    });
  }

  public sendMessage(message: string): void {
    this.hubConnection.invoke('SendMessage', message).then(() => console.log('Message Sent.')).catch((err) => console.log('Message Send Error. ' + err));
  }

  public enterToRoom(roomId: string): void {
    this.leaveFromRoom();

    this.hubConnection.invoke('JoinToRoom', roomId).then((data) => {
      console.log('Joined To Room.');

      this.room.next(data);

      this.addReceiveMessageListener();
      this.addUserJoinedListener();
      this.addUserLeftListener();
    }).catch((err) => console.log('Joined To Room Error. ' + err));
  }

  public leaveFromRoom(): void {
    this.removeReceiveMessageListener();
    this.removeUserJoinedListener();
    this.removeUserLeftListener();

    // this.hubConnection.invoke('LeaveFromRoom').then(() => console.log('Left From Room.')).catch((err) => console.log('Left From Room Error. ' + err));
  }

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------

  public addReceiveMessageListener(): void {
    this.hubConnection.on('ReceiveMessage', (data) => {
      console.log(data);

      this.receiveMessage.next(data);
    });
  }

  public removeReceiveMessageListener(): void {
    this.hubConnection.off('ReceiveMessage');
  }

  public addUserJoinedListener(): void {
    this.hubConnection.on('UserJoined', (data) => {
      console.log(data);

      this.userJoined.next(data);
    });
  }

  public removeUserJoinedListener(): void {
    this.hubConnection.off('UserJoined');
  }

  public addUserLeftListener(): void {
    this.hubConnection.on('UserLeft', (data) => {
      console.log(data);

      this.userLeft.next(data);
    });
  }

  public removeUserLeftListener(): void {
    this.hubConnection.off('UserLeft');
  }
}
