import { AuthService } from '../services/auth/auth.service';
import {Component, OnInit, OnDestroy, Host, Injectable, Inject} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AdminGuard} from '../auth/auth.guard';
import {map} from 'rxjs/operators';
import {ProfileService} from '../services/profile/profile.service';
import {AppComponent} from '../app.component';
import {AuthComponent} from '../auth/auth.component';
import {UserObject} from '../profile/my-info/my-info.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuth = false;
  isAdmin = false;

  private userSub: Subscription;

  constructor(private authServirce: AuthService, private authGuard: AdminGuard, private http: HttpClient) { }

  ngOnInit(): void {
    this.userSub = this.authServirce.user.subscribe(user => {
      this.isAuth = !!user;
      if (user) {
        this.getUserInfo(user.token).subscribe(res => {
          if (res.roles.includes('ROLE_SUPER_ADMIN')) {
            this.isAdmin = true;
          }
        });
      }
    });
    console.log(this.isAdmin);
  }

  onLogOut(){
    this.authServirce.logOut();
    this.isAdmin = false;
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  getUserInfo(token): Observable<UserObject> {
    return this.http.get<UserObject>('https://127.0.0.1:8000/getuser', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }

}
