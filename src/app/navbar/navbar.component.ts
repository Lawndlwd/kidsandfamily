import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuth = false;
  private userSub: Subscription;

  constructor(private authServirce: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authServirce.user.subscribe(user =>{
      this.isAuth= !!user;
    });
  }
  
  onLogOut(){
    this.authServirce.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
