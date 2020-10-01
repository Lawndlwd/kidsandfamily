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
  url = 'https://lit-depths-70205.herokuapp.com/api/';

  constructor(private http: HttpClient, private  profileService: ProfileService) { }

  get(url): Observable<any>{
    return this.http.
    get('https://lit-depths-70205.herokuapp.com/api/' + url + '.json')
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
    return this.http.delete('https://lit-depths-70205.herokuapp.com/api/' + url + '/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }



  getListOfProfile(): any {
    return this.http.get<Profile>(this.url +
      'profiles.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
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
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
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
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }


  // TYPe

  getTypes(): Observable<any>{
    return this.http.
    get<Type>('https://lit-depths-70205.herokuapp.com/api/types.json')
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
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/types.json', {
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  deleteType(id): Observable<any>{
    return this.http.delete('https://lit-depths-70205.herokuapp.com/api/types/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editType(id, type): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/types/' + id , {
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  // Action

  getActions(): Observable<any>{
    return this.http.
    get<Action>('https://lit-depths-70205.herokuapp.com/api/actions.json')
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
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/actions.json', {
      actions
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  deleteActions(id): Observable<any>{
    return this.http.delete('https://lit-depths-70205.herokuapp.com/api/actions/' + id , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editActions(id, actions): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/actions/' + id , {
      actions
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

//  Needs

  addNeed(need: Need): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/needs.json', {
      need
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editNeeds(id, need: Need): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/needs/' + id , {
      need
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }


  //  CenterOfIntrest

  addCenterOfIntrest(CenterOfInterest: CenterOfIntreset): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/center_of_interests.json', {
      CenterOfInterest
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editCenterOfIntrest(id, CenterOfInterest: CenterOfIntreset): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/center_of_interests/' + id , {
      CenterOfInterest
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }



  //  Profession

  addProfession(profession: ProfessionObject): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/professions.json', {
      profession
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editProfession(id, profession: ProfessionObject): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/professions/' + id , {
      profession
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }


  //  Public

  addPublic(name: PublicCible): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/public_cibles.json', {
      name,
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editPublic(id, name: PublicCible): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/public_cibles/' + id , {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }



  //  SousType

  addSousType(sousType: SousType, type: string): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/sous_types.json', {
      sousType,
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editSousType(id, sousType: SousType, type: string): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/sous_types/' + id , {
      sousType,
      type
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }



  //  themes

  addtheme(theme: Theme): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/themes.json', {
      theme
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  edittheme(id, theme: Theme): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/themes/' + id , {
      theme
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }



  //  structure

  addStructure(name: Structure): Observable<any>{
    return this.http.post('https://lit-depths-70205.herokuapp.com/api/structures.json', {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }

  editStructure(id, name: Structure): Observable<any>{
    return this.http.put('https://lit-depths-70205.herokuapp.com/api/structures/' + id , {
      name
    }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    });
  }


}
