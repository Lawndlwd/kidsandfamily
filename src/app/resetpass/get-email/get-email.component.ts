import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-email',
  templateUrl: './get-email.component.html',
  styleUrls: ['./get-email.component.css']
})
export class GetEmailComponent implements OnInit {

  error: any[] = [];

  @ViewChild('emailForm') emailForm: NgForm;
  @ViewChild('secretKeyForm') secretKeyForm: NgForm;
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  id: number;
  email = false;
  code: string;
  canChange =  false;
  messages = [];
  constructor(private router: Router ,private authService: AuthService, private  profileService: ProfileService) { }

  ngOnInit(): void {
  }


  onSubmit(emailForm: NgForm): void {
    const email = this.emailForm.value.username;
    this.authService.emailResetPass(email).subscribe(res => {
      this.id = res.id;
      this.code = res.resetPassword;
      this.email = true;
    }, error => console.log(error));
  }

  onSubmitCode(): void{
    const code = (this.secretKeyForm.value.key).trim();
    if (this.code !== code){
      this.error.push('Votre code est faux');
      setTimeout(() => this.error = [], 3500);
    }else {
      this.canChange = true;
    }
  }

  onSubmitPass(): void {
    const pass = this.resetPasswordForm.value.password;
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.rePassword){
      this.error.push('Les deux mots de passe ne sont pas identiques.');
      setTimeout(() => this.error = [], 3500);

    }
    this.profileService.resetPassword(this.id, pass).subscribe(resData => {
      this.messages.push('Votre mot de passe a été bien changé ');
      setTimeout(() => {
        this.messages = [];
        this.router.navigate(['/auth']);
        this.canChange = false;
        this.email = false;
      }, 2500);



    }, error1 => console.log(error1));
  }
}
