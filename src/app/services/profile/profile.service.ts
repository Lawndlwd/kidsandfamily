import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {User} from '../auth/User.model';
import {ProfessionObject, UserObject} from '../../profile/my-info/my-info.component';
import {Publication} from '../../main/main-default/publication/publication.model';
import {Type} from '../../profile/my-profile/my-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  urlInfo = 'https://127.0.0.1:8000/getuser';
  token = JSON.parse(localStorage.getItem('userToken'));


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  )
  { }

  // tslint:disable-next-line:typedef
  getUserInfo() {
    return this.http.get<UserObject>(this.urlInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

    getProfession(){
      return this.http.
      get<ProfessionObject>('https://127.0.0.1:8000/api/professions.json')
      .pipe(map ((resData: ProfessionObject) => {
        const arrProf: ProfessionObject[] = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            arrProf.push(resData[key]);
          }
        }
        return arrProf;
      }));
  }

  saveMyInfo(
    id: number,
    fName: string,
    lName: string,
    mStatus?: string,
    birthday?: string,
    gender?: string,
    teleFix?: number,
    teleMob?: number,
    profession?: string
  ){
    return this.http.put('https://127.0.0.1:8000/api/users/' + id + '.json', {
      firstName: fName,
      LastName: lName,
      maritalStatus: mStatus,
      bithday: birthday,
      gender,
      phoneFix: teleFix,
      phoneMobile: teleMob,
      profession
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }


  // tslint:disable-next-line:typedef
  getTypes(){
    return this.http.
    get<Type>('https://127.0.0.1:8000/api/types.json')
    .pipe(map ((resData: Type) => {
      const arrProf: Type[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf;
    }));
  }


  // tslint:disable-next-line:typedef
  getSousTypes(id){
    return this.http.
    get<Type>('https://127.0.0.1:8000/api/types.json?id=' + id);
  }


}
