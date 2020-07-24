import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router ){

  }

  ngOnInit(): void {
  }
  isLoginMode = true;
  isLoading = false;
  error: string =null; 
  recaptcha:any[];
  

  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const rePassword = form.value.rePassword;
    const lName = form.value.LastName;
    const fName = form.value.firstName;
    console.log(form.value)
    if (password !== rePassword){
      this.error = 'the two password does not match'
    }else{

      
      this.isLoading =true
      this.authService.signUp(fName, lName,email,password).subscribe(resData =>{
        this.authService.Login(email,password).subscribe(resData =>{
          this.isLoading =false;
          this.router.navigate(['/'])
    
        });        
      },errorRes => {
        if (errorRes.error['hydra:description'] == 'email: This value is already used.'){

          this.error = 'cette email est deja exist';
        }else{

          this.error = 'qsfdfqsd55555';
        }
        console.log(errorRes);
        this.isLoading =false
        
      });
      
    }
    form.reset();
  }

}
