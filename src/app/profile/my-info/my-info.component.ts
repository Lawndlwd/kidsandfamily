import { NgForm } from '@angular/forms';
import {Component, OnInit,  ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
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
  phoneFix?: number;
  phoneMobile?: number;
  createdAt: Date;
  profiles?: Profile;
  themes?: Theme;
  userPubComments?: UserPubComment;
  centerOfInterests?: any;
  publications?: Publication;
  profession?: any;
  isActivated: boolean;


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

  @ViewChild('infoForm') infoForm: NgForm;

  constructor(private profileService: ProfileService) { }


  ngOnInit(): void {
    this.profileService.getUserInfo().subscribe(resData => {

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
      console.log(resData);
      this.loadedProf = resData;
    });
    console.log(this.loadedData.id);



  }


  onSubmit(infoForm: NgForm){
    if (!this.infoForm.valid){
      return;
    }
    const lName = this.infoForm.value.LastName;
    const fName = this.infoForm.value.firstName;
    const mStatus = this.infoForm.value.maritalStatus;
    const birthday = this.infoForm.value.bithday;
    const gender = this.infoForm.value.gender;
    const teleFix = this.infoForm.value.phoneFix;
    const teleMob = this.infoForm.value.phoneMobile;
    const profession = this.infoForm.value.profession;

    this.profileService.saveMyInfo(this.loadedData.id, fName, lName, mStatus, birthday, gender, teleFix, teleMob, profession)
      .subscribe(resData => {
        console.log(resData);
      });
  }

}
