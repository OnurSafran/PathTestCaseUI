import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RoomService} from '../services/room.service';
import {User} from '../model/user';
import {Room} from '../model/room';
import {DialogNicknameComponent} from '../dialog-nickname/dialog-nickname.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  user: User;
  activeRoom: Room;

  constructor(roomService: RoomService, userService: UserService, public dialog: MatDialog) {
    this.user = new User();
    this.user.nickName = '';
  }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNicknameComponent, {
      width: '250px',
      data: this.user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
