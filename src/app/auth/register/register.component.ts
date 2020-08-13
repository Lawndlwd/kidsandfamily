import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitCaptcha = false;
  isLoading = false;
  error: string = null;
  recaptcha: any[];
  dRecaptcha = true;
  templateUnchecked = false;
  templateChecked = true;
  template = true;
  admin = false;

  @ViewChild('authForm') signUpForm: NgForm;

  constructor(private authService: AuthService, private router: Router ){

  }

  ngOnInit(): void {
    if (location.pathname === '/admin/users/create-user'){
      this.dRecaptcha = false;
    }
  }



  // tslint:disable-next-line:typedef
  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    if (this.recaptcha){
      this.submitCaptcha = true;
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (!this.signUpForm.valid){
      return;
    }
    if (!this.dRecaptcha){
      this.admin = this.signUpForm.value.admin;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const rePassword = this.signUpForm.value.rePassword;
    const lName = this.signUpForm.value.LastName;
    const fName = this.signUpForm.value.firstName;
    console.log(this.signUpForm.value);
    if (password !== rePassword){
      this.error = 'the two password does not match';
    }else{


      this.isLoading = true;
      if (!this.dRecaptcha){
        this.authService.signUp(fName, lName, email, password, this.admin ? ['ROLE_ADMIN'] : []).subscribe(resData1 => {
          // tslint:disable-next-line:no-shadowed-variable
          console.log(resData1);
          this.isLoading = false;
        }, errorRes => {
          // tslint:disable-next-line:triple-equals
          if (errorRes.error['hydra:description'] == 'email: This value is already used.'){

            this.error = 'email: Cette valeur est déjà utilisée.';
          }else{

            this.error = 'Erreur inconnue';
          }
          console.log(errorRes);
          this.isLoading = false;

        });

      }else {
        this.authService.signUp(fName, lName, email, password, []).subscribe(resData => {
          // tslint:disable-next-line:no-shadowed-variable
          this.authService.sendActivation(resData.id).subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/activateAccount']);

          });
        }, errorRes => {
          // tslint:disable-next-line:triple-equals
          if (errorRes.error['hydra:description'] == 'email: This value is already used.') {

            this.error = 'email: Cette valeur est déjà utilisée.';
          } else {

            this.error = 'Erreur inconnue';
          }
          console.log(errorRes);
          this.isLoading = false;

        });
      }
    }
    this.signUpForm.controls.password.reset();
    this.signUpForm.controls.rePassword.reset();
  }

}
