import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {NgForm} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  emailSent = false;
  id: number;
  secretKey: string;
  isLoading = false;
  canChange = false;
  error: any[] = [];
  messages: any[] = [];

  @ViewChild('secretKeyForm') secretKeyForm: NgForm;
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  constructor(private profileService: ProfileService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

    this.profileService.getUserInfo().subscribe(resData => {
      this.id = resData.id;
    }, error => {
      console.log(error);
    });


  }

  onResetPassword(): void {

    this.profileService.resetPasswordmail(this.id).subscribe(resData => {
        this.emailSent = true ;
      }, error => console.log(error)
    );
  }

  onSubmit(): void {
    this.profileService.getUserInfo().subscribe(resData => {
      this.secretKey = resData.resetPassword;
      const formKey = (this.secretKeyForm.value.key).trim();
      if (this.secretKey !== formKey){
        this.error.push('Votre code est faux');
        setTimeout(() => this.error = [], 3500);

      }else {
        this.canChange = true;
      }
    }, error => {
      console.log(error);
    });

  }

  onSubmitKey(): void {

    const pass = this.resetPasswordForm.value.password;
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.rePassword){
      this.error.push('Les deux mots de passe ne sont pas identiques.');
      setTimeout(() => this.error = [], 3500);

    }
    this.profileService.resetPassword(this.id, pass).subscribe(resData => {
      this.canChange = false;
      this.emailSent = false;
      this.messages.push('Votre mot de passe a été bien changé ');
      setTimeout(() => this.messages = [], 3500);

    }, error1 => console.log(error1));
  }

  onDeleteUser(): void{
    this.isLoading = true;
    this.profileService.deleteUser(this.id).subscribe(resData => {
      setTimeout(() => this.isLoading = false , 2500);
      this.auth.logOut();
      this.router.navigate(['/']);
    }, error1 => console.log(error1));

  }

}
