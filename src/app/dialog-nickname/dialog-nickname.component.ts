import {Component, Inject, OnInit} from '@angular/core';
import {UserInfo} from '../model/user-info';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-dialog-nickname',
  templateUrl: './dialog-nickname.component.html',
  styleUrls: ['./dialog-nickname.component.css']
})
export class DialogNicknameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNicknameComponent>, @Inject(MAT_DIALOG_DATA) public user: UserInfo, private chatService: ChatService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.user.nickName === null || this.user.nickName === '') {
      return;
    }

    this.chatService.startConnection(this.user.nickName);
  }
}
