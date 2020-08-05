import { NgForm } from '@angular/forms';
import {Component, OnInit,  ViewChild} from '@angular/core';
import {CenterOfIntreset, ProfileService} from '../../services/profile/profile.service';
import {Profile, Publication, Theme, UserPubComment} from '../../main/main-default/publication/publication.model';
declare var $: any;

export class UserObject {
  id?: number;
  firstName: string;
  LastName: string;
  email: string;
  gender?: string;
  maritalStatus?: string;
  bithday?: Date;
  phoneFix?: string;
  phoneMobile?: string;
  createdAt: Date;
  profiles?: Profile;
  themes?: Theme;
  userPubComments?: UserPubComment;
  centerOfInterests?: CenterOfIntreset;
  publications?: Publication;
  profession?: any;
  isActivated: boolean;
  resetPassword?: string;

}
export class ProfessionObject {
  id: number;
  profession: string;

}


@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
  loadedData: UserObject;
  loadedProf: ProfessionObject[];
  isLoading = false;
  success = false;
  failed = false;

  @ViewChild('myInfoForm') infoForm: NgForm;

  constructor(private profileService: ProfileService) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getUserInfo().subscribe(resData => {
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
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.failed = true;
      });

  }

}
