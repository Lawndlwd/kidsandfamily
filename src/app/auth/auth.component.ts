import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(private authService: AuthService, private router: Router ){

  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      return;
    }
    const email = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.Login(email, password).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/']);

    }, errorRes => {


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

    // const token = localStorage.getItem('userToken');
    //
    // this.authService.getFirstInfo(token).subscribe(user => {
    //   console.log(user);
    // }, error => {
    //   console.log(error);
    // });

  }
  // onSubmitt(form: NgForm){
  //   const place = form.value.username
  //   this.authService.getCor(place).subscribe(resData=>{
  //     console.log(resData);
  //   })
  // }
}
