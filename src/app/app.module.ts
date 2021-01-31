import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RoomService} from './services/room.service';
import {AppRoutingModule} from './app-routing.module';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DialogNicknameComponent } from './dialog-nickname/dialog-nickname.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LoadingComponent} from './loading/loading.component';
import {UserService} from './services/user.service';
import {LoadingService} from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RightPanelComponent,
    LeftPanelComponent,
    MainScreenComponent,
    DialogNicknameComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [RoomService, UserService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
