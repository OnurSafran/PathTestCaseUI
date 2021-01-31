import { Injectable } from '@angular/core';
import {LoadingService} from './loading.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {USER_URL} from '../app.config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  public login(user: User): Observable<User> {
    this.loadingService.startLoading();

    return this.http.post<User>(USER_URL + '/login', user)
      .pipe(map(
        (response: User) => {
          console.log(response);
          this.loadingService.stopLoading();

          return response;
        })
      );
  }
}
