import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProfileService} from '../../../services/profile/profile.service';
import {Publication} from '../../../main/main-default/publication/publication.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  url = 'https://lit-depths-70205.herokuapp.com/api/';

  constructor(private http: HttpClient, private  profileService: ProfileService) { }

  // tslint:disable-next-line:typedef
  getListOfPubs() {
    return this.http.get<Publication>(this.url +
      'publications.json', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))._token
      })
    }).pipe(map ((resData: Publication) => {
      const arrProf: Publication[] = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          arrProf.push(resData[key]);
        }
      }
      return arrProf;
    }));
  }}
