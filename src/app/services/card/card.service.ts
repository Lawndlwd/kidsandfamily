import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
export class CorRes  {
  data: {
    longitude: number;
    latitude: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient, private router: Router) { }

  getLocalisation(localisation){
    const key = 'dad06ede9d99985348d1d5801c524a52';
    const limit = 1;
    return this.http.get<CorRes>('http://api.positionstack.com/v1/forward?access_key=' + key + '&query=' + localisation + '&limit=1');

  }
}
