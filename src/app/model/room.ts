import {Message} from './message';
import {UserInfo} from './user-info';

export class Room {
  roomId: string;
  title: string;
  messages: Message[];
}
