import { AuthService } from './../services/auth/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string =null; 
  

  constructor(private authService: AuthService,private router: Router ){

  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      return;
    }
    const email = form.value.username;
    const password = form.value.password;

    this.isLoading =true
      this.authService.Login(email,password).subscribe(resData =>{
        this.isLoading =false;
        this.router.navigate(['/'])
  
      },errorRes => {
  
        this.error = errorRes.error.message
        this.isLoading =false
  
      });

    form.reset();
  }
}
