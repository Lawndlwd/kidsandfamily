import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient,private router: Router) { }

  getLocalisation(localisation){
    const key:string = 'dad06ede9d99985348d1d5801c524a52';
    const limit:number= 1;
    return this.http.get('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+localisation+'&limit=1')
                        
  }
}
