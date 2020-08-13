import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProfileService} from '../../../services/profile/profile.service';
import {UserAdmin} from '../../users/show-users/show-users.component';
import {map} from 'rxjs/operators';
import {Profile} from '../../../main/main-default/publication/publication.model';
import {Observable} from 'rxjs';
import {Type} from '../../../profile/my-profile/my-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {
  url = 'https://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private  profileService: ProfileService) { }

  getListOfProfile(): any {
    return this.http.get<Profile>(this.url +
      'profiles.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    }).pipe(map ((resData: Profile) => {
      const arrProf: Profile[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf;
    }));
  }

  getNumOfPubs(type): any {
    return this.http.get<Profile>(this.url +
      'profiles.json?type.type=' + type, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    }).pipe(map ((resData: Profile) => {
      const arrProf: Profile[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf.length;
    }));
  }
  deleteProfile(id): any {
    return this.http.delete(this.url +
      'profiles/' + id + '.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  getTypes(): Observable<any>{
    return this.http.
    get<Type>('https://127.0.0.1:8000/api/types.json')
      .pipe(map ((resData: Type) => {
        const arrProf: Type[] = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            arrProf.push(resData[key].type);
          }
        }
        return arrProf;
      }));
  }

}
