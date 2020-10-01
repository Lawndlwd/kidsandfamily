import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {User} from '../auth/User.model';
import {ProfessionObject, UserObject} from '../../profile/my-info/my-info.component';
import {Profile, Publication} from '../../main/main-default/publication/publication.model';
import {SousType, Type} from '../../profile/my-profile/my-profile.component';
import {Observable} from 'rxjs';

export class CenterOfIntreset {
  id: number;
  CenterOfInterest: string;
  checked = false;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  urlInfo = 'https://lit-depths-70205.herokuapp.com/getuser';
  token = JSON.parse(localStorage.getItem('userToken'));


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  )
  { }

  getUserInfo(): Observable<UserObject> {
    return this.http.get<UserObject>(this.urlInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

    getProfession(): any {
      return this.http.
      get<ProfessionObject>('https://lit-depths-70205.herokuapp.com/api/professions.json')
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
    teleFix?: string,
    teleMob?: string,
    profession?: string
  ): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/users/' + id + '.json', {
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
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }


  getTypes(): Observable<any>{
    return this.http.
    get<Type>('https://lit-depths-70205.herokuapp.com/api/types.json')
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


  getSousTypes(id): Observable<SousType>{
    return this.http.
    get<SousType>('https://lit-depths-70205.herokuapp.com/api/types.json?id=' + id);
  }


  getUserProfile(): Observable<any> {
    return this.http.get<UserObject>(this.urlInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    }).pipe(map (resData => {
      const arrProf: Profile[] = [];
      for (const key in resData.profiles){
        if (resData.profiles.hasOwnProperty(key)){
          arrProf.push(resData.profiles[key]);
        }
      }
      return arrProf;
    }));
  }

  getProfiles(id){
    return this.http.get<Profile>('https://lit-depths-70205.herokuapp.com/api/profiles/' + id + '.json')
      ;
  }
  editProfiles(
    id: number,
    type: string ,
    sousType: string ,
    city: string,
    codePostal: number,
    country: string,
    nameVoie: string,
    numVoie: number,
    state: string,
    adressComplete?: string,
  ){
    return this.http.put<Profile>('https://lit-depths-70205.herokuapp.com/api/profiles/' + id + '.json', {
      type,
      sousType,
      adressComplete,
      city,
      codePostal,
      country,
      nameVoie,
      numVoie,
      state,
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    })
      ;
  }



  createProfile(
    type: string,
    sousType: string,
    adressComplete: string,
    city: string,
    codePostal: number,
    country: string,
    nameVoie: string,
    numProfile: number,
    numVoie: number,
    state: string,
    lan: string,
    lat: string,
  ): Observable<Profile>{

    return this.http.post<Profile>('https://lit-depths-70205.herokuapp.com/api/profiles.json', {
      type,
      sousType,
      adressComplete,
      city,
      codePostal,
      country,
      numProfile,
      nameVoie,
      numVoie,
      state,
      lan,
      lat,
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  deleteProfile(id): Observable<Profile> {
    return this.http.delete<Profile>('https://lit-depths-70205.herokuapp.com/api/profiles/' + id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  getInterest(): Observable<any> {
    return this.http.get<CenterOfIntreset>('https://lit-depths-70205.herokuapp.com/api/center_of_interests.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    }).pipe(map (resData => {
      const arrProf: CenterOfIntreset[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf;
    }));
  }


  setCenterOfIntreset(
    id: number,
    centerOfInterests: [{
      id: number,
    }],
  ): Observable<any>{
    return this.http.put<UserObject>('https://lit-depths-70205.herokuapp.com/api/users/' + id + '.json', {
      centerOfInterests,
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    })
      ;
  }

  // tslint:disable-next-line:typedef
  resetPasswordmail(id) {
    return this.http.put<UserObject>('https://lit-depths-70205.herokuapp.com/api/' + id + '/reset-password-mail', {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(id, password) {
    if (this.token) {
      return this.http.put<UserObject>('https://lit-depths-70205.herokuapp.com/api/' + id + '/reset-password', {
        password,
      }, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
        })
      });
    }
    if (!this.token) {
      return this.http.put<UserObject>('https://lit-depths-70205.herokuapp.com/api/' + id + '/reset-password', {
        password,
      });
    }
  }


  deleteUser(id): any {
    return this.http.delete('https://lit-depths-70205.herokuapp.com/api/users/' + id + '.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }
}
