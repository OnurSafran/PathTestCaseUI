import {environment} from '../environments/environment';

export const ROOM_URL = environment.baseApiUrl + 'api/room';
export const USER_URL = environment.baseApiUrl + 'api/user';
export const LOGIN_URL = USER_URL + '/login';
