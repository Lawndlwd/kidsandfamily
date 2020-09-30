import { AuthService } from '../services/auth/auth.service';
import {Component, OnInit, OnDestroy, Host, Injectable, Inject, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AdminGuard} from '../auth/auth.guard';
import {UserObject} from '../profile/my-info/my-info.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authServirce: AuthService, private authGuard: AdminGuard, private http: HttpClient) { }

  isAuth = false;
  isAdmin = false;

  private userSub: Subscription;

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
  }
  onLogOut(): void{
    this.authServirce.logOut();
    this.isAdmin = false;
  }

  ngOnDestroy(): void{
    this.userSub.unsubscribe();
  }
  getUserInfo(token): Observable<UserObject> {
    return this.http.get<UserObject>('https://lit-depths-70205.herokuapp.com/getuser', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }

}
