import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {NgForm} from '@angular/forms';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  emailSent = false;
  id: number;
  secretKey: string;
  canChange = false;
  error: any[] = [];
  messages: any[] = [];

  @ViewChild('secretKeyForm') secretKeyForm: NgForm;
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {

    this.profileService.getUserInfo().subscribe(resData => {
      this.id = resData.id;
    }, error => {
      console.log(error);
    });


  }

  onResetPassword(): void {

    this.profileService.resetPasswordmail(this.id).subscribe(resData => {
        console.log(resData);
        this.emailSent = true ;
      }, error => console.log(error)
    );
  }

  onSubmit(): void {
    this.profileService.getUserInfo().subscribe(resData => {
      this.secretKey = resData.resetPassword;
      const formKey = (this.secretKeyForm.value.key).trim();
      console.log(this.secretKey);
      if (this.secretKey !== formKey){
        this.error.push('1');
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
      this.error.push('2');
    }
    this.profileService.resetPassword(this.id, pass).subscribe(resData => {
      console.log(resData);
      this.canChange = false;
      this.emailSent = false;
      this.messages.push('Mode de pass ete bien change');
    }, error1 => console.log(error1));
  }

}
