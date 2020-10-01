import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProfileService} from '../../../services/profile/profile.service';
import {UserAdmin} from '../../users/show-users/show-users.component';
import {map} from 'rxjs/operators';
import {UserObject} from '../../../profile/my-info/my-info.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://lit-depths-70205.herokuapp.com/api/';
  token = JSON.parse(localStorage.getItem('userToken'));


  constructor(private http: HttpClient, private  profileService: ProfileService) { }

  // tslint:disable-next-line:typedef
  getListOfUsers() {
    return this.http.get<UserObject>(this.url +
      'users.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    }).pipe(map ((resData: UserObject) => {
        const arrProf: UserObject[] = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            arrProf.push(resData[key]);
          }
        }
        return arrProf;
      }));
  }

  deleteUser(id): any {
    return this.http.delete( this.url + 'users/' + id + '.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

  getPubsOfUser(): any {
    return this.http.delete( this.url + 'publications.json?user=null', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

  getUserInfo(id: number): Observable<UserObject> {
    return this.http.get<UserObject>(this.url + 'users/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }
}
