import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CenterOfIntreset, ProfileService} from '../../../services/profile/profile.service';
import {map} from 'rxjs/operators';
import {Action, Need, Profile, PublicCible, Structure, Theme} from '../../../main/main-default/publication/publication.model';
import {Observable} from 'rxjs';
import {SousType, Type} from '../../../profile/my-profile/my-profile.component';
import {ProfessionObject} from '../../../profile/my-info/my-info.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {
  url = 'https://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private  profileService: ProfileService) { }

  get(url): Observable<any>{
    return this.http.
    get('https://127.0.0.1:8000/api/' + url + '.json')
      .pipe(map ((resData) => {
        const arrProf = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            arrProf.push(resData[key]);
          }
        }
        return arrProf;
      }));
  }



  delete(id, url ): Observable<any>{
    return this.http.delete('https://127.0.0.1:8000/api/' + url + '/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }



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


  // TYPe

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

  addType(type: Type): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/types.json', {
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  deleteType(id): Observable<any>{
    return this.http.delete('https://127.0.0.1:8000/api/types/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editType(id, type): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/types/' + id , {
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  // Action

  getActions(): Observable<any>{
    return this.http.
    get<Action>('https://127.0.0.1:8000/api/actions.json')
      .pipe(map ((resData: Action) => {
        const arrProf: Action[] = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            arrProf.push(resData[key]);
          }
        }
        return arrProf;
      }));
  }

  addActions(actions: Action): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/actions.json', {
      actions
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  deleteActions(id): Observable<any>{
    return this.http.delete('https://127.0.0.1:8000/api/actions/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editActions(id, actions): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/actions/' + id , {
      actions
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

//  Needs

  addNeed(need: Need): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/needs.json', {
      need
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editNeeds(id, need: Need): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/needs/' + id , {
      need
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }


  //  CenterOfIntrest

  addCenterOfIntrest(CenterOfInterest: CenterOfIntreset): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/center_of_interests.json', {
      CenterOfInterest
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editCenterOfIntrest(id, CenterOfInterest: CenterOfIntreset): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/center_of_interests/' + id , {
      CenterOfInterest
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }



  //  Profession

  addProfession(profession: ProfessionObject): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/professions.json', {
      profession
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editProfession(id, profession: ProfessionObject): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/professions/' + id , {
      profession
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }


  //  Public

  addPublic(name: PublicCible): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/public_cibles.json', {
      name,
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editPublic(id, name: PublicCible): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/public_cibles/' + id , {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }



  //  SousType

  addSousType(sousType: SousType, type: string): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/sous_types.json', {
      sousType,
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editSousType(id, sousType: SousType, type: string): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/sous_types/' + id , {
      sousType,
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }



  //  themes

  addtheme(theme: Theme): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/themes.json', {
      theme
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  edittheme(id, theme: Theme): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/themes/' + id , {
      theme
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }



  //  structure

  addStructure(name: Structure): Observable<any>{
    return this.http.post('https://127.0.0.1:8000/api/structures.json', {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }

  editStructure(id, name: Structure): Observable<any>{
    return this.http.put('https://127.0.0.1:8000/api/structures/' + id , {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.profileService.token._token
      })
    });
  }


}
