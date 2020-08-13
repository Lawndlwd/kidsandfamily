import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../../../services/profile/profile.service';
import {ProfessionObject, UserObject} from '../../../profile/my-info/my-info.component';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  loadedData: UserObject;
  loadedProf: ProfessionObject[];
  isLoading = false;
  success = false;
  failed = false;
  id: number;


  @ViewChild('myInfoForm') infoForm: NgForm;

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private router: ActivatedRoute
              ) { }


  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.isLoading = true;
    this.userService.getUserInfo(this.id).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.loadedData = {
        id: resData.id,
        firstName: resData.firstName,
        LastName: resData.LastName,
        email: resData.email,
        gender: resData.gender,
        maritalStatus: resData.maritalStatus,
        bithday: resData.bithday,
        phoneFix: resData.phoneFix,
        phoneMobile: resData.phoneMobile,
        createdAt: resData.createdAt,
        profiles: resData.profiles,
        themes: resData.themes ,
        userPubComments: resData.userPubComments,
        centerOfInterests: resData.centerOfInterests,
        publications: resData.publications,
        profession: resData.profession,
        isActivated: resData.isActivated,
      };
    });


    this.profileService.getProfession().subscribe(resData  => {
      this.loadedProf = resData;

    });
  }


  // tslint:disable-next-line:typedef
  onSubmit(){
    this.isLoading = true;

    // if (!this.infoForm.valid){
    //   return;
    // }
    const lName = this.infoForm.value.lastName;
    const fName = this.infoForm.value.firstName;
    const mStatus = this.infoForm.value.maritalStatus;
    const birthday = this.infoForm.value.birthday;
    const gender = this.infoForm.value.gender;
    const teleFix: string = this.infoForm.value.teleFix;
    const teleMob: string = this.infoForm.value.telemob;
    const profession = '/api/professions/' + this.infoForm.value.profession;

    this.isLoading = true;
    this.profileService.saveMyInfo(this.loadedData.id, fName, lName, mStatus, birthday, gender, teleFix, teleMob, profession)
      .subscribe(resData => {
        console.log(resData);
        this.success = true;
        setTimeout(() => this.success = false, 3500);
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.failed = true;
        setTimeout(() => this.failed = false, 3500);
      });

  }


}
