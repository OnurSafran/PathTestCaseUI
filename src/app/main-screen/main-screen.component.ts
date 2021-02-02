import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserInfo} from '../model/user-info';
import {Room} from '../model/room';
import {DialogNicknameComponent} from '../dialog-nickname/dialog-nickname.component';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  user: UserInfo;
  activeRoom: Room;
  public dialogActive = false;

  constructor(public chatService: ChatService, private dialog: MatDialog) {
    this.user = new UserInfo();
    this.user.nickName = '';

    this.chatService.connected.subscribe((data) => {
      if (!data) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    });
  }

  ngOnInit(): void {

  }

  openDialog(): void {
    if (this.dialogActive) {
      return;
    }

    const dialogRef = this.dialog.open(DialogNicknameComponent, {
      width: '250px',
      data: this.user,
      disableClose: true
    });

    this.dialogActive = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.dialogActive = false;
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
