import { Theme, UserPubComment } from './../../main/main-default/publication/publication.model';
import { User } from './User.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class AuthResponseData {
  token: string
}
export class RegResponseData {
   email: string;
   password: string;
   LastName:  string ;
   firstName:  string ;
  }


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private tokenExpDate: any;

  constructor(private http: HttpClient,private router: Router ) { }
  
  Login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://127.0.0.1:8000/api/login_check',
    {
      username: email,
      password: password
    }
    ).pipe(tap(resData => {
      const token=  new User(resData.token);
      this.user.next(token);
      this.autoLogOut();
      localStorage.setItem('userData',JSON.stringify(token));
    })
    );
  }

  autoLogin(){
    const userData: {_token : string }  = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }

    const loadedUser = new User(userData._token)
    if (loadedUser.token){
      this.user.next(loadedUser);
      this.autoLogOut();
    }

  }

  autoLogOut(){
    let expDate:number = 3600*1000 

    this.tokenExpDate = setTimeout(()=>{
      this.logOut();
    }, expDate)
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpDate){
      clearTimeout(this.tokenExpDate);
    }
    this.tokenExpDate =null;
    this.router.navigate(['/auth']);
  }


  signUp(fName:string, lName: string ,email: string, password: string){
    return this.http.post<RegResponseData>('https://127.0.0.1:8000/api/users',
    {
      email: email,
      password: password,
      firstName: fName,
      LastName: lName
    }
    );
  }
}


