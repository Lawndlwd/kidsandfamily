import {Component, Injectable, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {ProfileService} from '../services/profile/profile.service';
import {Observable} from 'rxjs';
import {UserObject} from '../profile/my-info/my-info.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '@angular/compiler';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  token: any;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService , private http: HttpClient) {
  }

  onSubmit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const email = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.Login(email, password).subscribe(resData => {
      this.token = resData.token;
      this.http.get<UserObject>('https://127.0.0.1:8000/getuser', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token
        })
      }).subscribe(res => {
        if (res.roles.includes('ROLE_SUPER_ADMIN')){
          this.isAdmin = true;
        }
        if (res.isBlocked === false){
          this.isLoading = false;
          this.router.navigate(['/']);
        }else{
          this.isLoading = false;
          this.authService.logOut();
          this.error = 'Votre compte est blocke ';
        }
      });

    }, errorRes => {
      console.log(errorRes);


      const errors = errorRes.error.message;
      if (errors === 'Invalid credentials.'){
        this.error = 'Les informations d\'identification invalides.';
      }
      else{

        this.error = 'Erreur inconnue';
      }
      this.isLoading = false;

    });

    form.reset();
  }
}
