import { User } from './User.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {exhaustMap, take, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {ProfessionObject, UserObject} from '../../profile/my-info/my-info.component';

export class AuthResponseData {
  token?: string;
  activation_token?: string;
}
export class RegResponseData {
   id?: number;
   email: string;
   password: string;
   LastName?: string ;
   firstName?: string ;
   profession: ProfessionObject;
  }


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpDate: any;

  constructor(private http: HttpClient, private router: Router ) { }

  Login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://127.0.0.1:8000/api/login_check',
    {
      username: email,
      password
    }
    ).pipe(tap(resData => {
      const token =  new User(resData.token);
      this.user.next(token);
      this.autoLogOut();
      localStorage.setItem('userToken', JSON.stringify(token));
    })
    );
  }

  autoLogin(){
    const userToken: {_token: string }  = JSON.parse(localStorage.getItem('userToken'));
    if (!userToken){
      return;
    }

    const loadedUser = new User(userToken._token);
    if (loadedUser.token){
      this.user.next(loadedUser);
      this.autoLogOut();
    }

  }


  getCor(email) {
    const key = 'dad06ede9d99985348d1d5801c524a52';
    const limit = 1;
    return this.http.get('http://api.positionstack.com/v1/forward?access_key=' + key + '&query=' + email + '&limit=1');
    //http://api.positionstack.com/v1/forward?
    //access_key=dad06ede9d99985348d1d5801c524a52
    //&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC
  }

  autoLogOut(): void{
    const expDate: number = 1800 * 1000;

    this.tokenExpDate = setTimeout(() => {
      this.logOut();
    }, expDate);
  }

  // tslint:disable-next-line:typedef
  logOut(){
    this.user.next(null);
    localStorage.removeItem('userToken');
    if (this.tokenExpDate){
      clearTimeout(this.tokenExpDate);
    }
    this.tokenExpDate = null;
    this.router.navigate(['/auth']);
  }


  // tslint:disable-next-line:typedef
  signUp(fName: string, lName: string , email: string, password: string, roles: any[], profession: string){
    return this.http.post<RegResponseData>('https://127.0.0.1:8000/api/users',
    {
      email,
      password,
      firstName: fName,
      LastName: lName,
      roles,
      profession
    }
    );
  }


  // tslint:disable-next-line:typedef
  sendActivation(id){
    return this.http.put<AuthResponseData>('https://127.0.0.1:8000/api/' + id + '/register', {}
    );
  }

  checkToken(token, id){
    return this.http.get<RegResponseData>('https://127.0.0.1:8000/api/' + id + '/register/' + token);
  }
  emailResetPass(email){
    return this.http.get<UserObject>('https://127.0.0.1:8000/api/reset-pass/' + email);
  }
}


