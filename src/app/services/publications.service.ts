import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Publication } from '../main/main-default/publication/publication.model'

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {



  constructor(private http : HttpClient) {
  }
  getPubsNoArgment(url){
    return this.http.get(url)
    .pipe(map ((responseData: Publication)=> {
      let arrPub: Publication[] =[];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)){
          arrPub.push(responseData[key])
        }
      }
      return arrPub;
    }))
  }

  getPubsWithArgment(url){
    return this.http.get(url)
    .pipe(map ((responseData: Publication) => {
      let arrPub: Publication[] =[];
      arrPub.push(responseData)
      return arrPub;
    }))
  }

}
