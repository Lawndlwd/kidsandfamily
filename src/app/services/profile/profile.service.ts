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
}


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

  getUserInfo(): Observable<UserObject> {
    return this.http.get<UserObject>(this.urlInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

    getProfession(): any {
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
    teleFix?: string,
    teleMob?: string,
    profession?: string
  ): Observable<any>{
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


  getTypes(): Observable<any>{
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


  getSousTypes(id): Observable<SousType>{
    return this.http.
    get<SousType>('https://127.0.0.1:8000/api/types.json?id=' + id);
  }


  getUserProfile(): Observable<any> {
    return this.http.get<UserObject>(this.urlInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    }).pipe(map (resData => {
      console.log(resData);
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
    return this.http.get<Profile>('https://127.0.0.1:8000/api/profiles/' + id + '.json')
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
    return this.http.put<Profile>('https://127.0.0.1:8000/api/profiles/' + id + '.json', {
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
        Authorization: 'Bearer ' + this.token._token
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
    console.log(lan);
    console.log(lat);

    return this.http.post<Profile>('https://127.0.0.1:8000/api/profiles.json', {
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
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

  deleteProfile(id): Observable<Profile> {
    return this.http.delete<Profile>('https://127.0.0.1:8000/api/profiles/' + id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

  getInterest(): Observable<any> {
    return this.http.get<CenterOfIntreset>('https://127.0.0.1:8000/api/center_of_interests.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    }).pipe(map (resData => {
      console.log(resData);
      const arrProf: CenterOfIntreset[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf;
    }));
  }

}
