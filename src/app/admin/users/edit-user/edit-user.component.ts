import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../../../services/profile/profile.service';
import {ProfessionObject, UserObject} from '../../../profile/my-info/my-info.component';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Profile, Publication} from '../../../main/main-default/publication/publication.model';
import {ProfileAdminService} from '../../service/profile/profile-admin.service';

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
  professionDefault: number;


  @ViewChild('myInfoForm') infoForm: NgForm;
  profileArr: Profile[];
  profiles: Profile[];
  hasProfile: boolean;
  hasPubs: boolean;
  pubs: Publication[];
  page = 1;
  page1 = 1;
  NumberOfPub: number;
  NumberOfProfile: number;

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private router: ActivatedRoute,
              private profileAdminService: ProfileAdminService
              ) { }


  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.isLoading = true;
    this.userService.getUserInfo(this.id).subscribe(resData => {
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
        themes: resData.themes,
        userPubComments: resData.userPubComments,
        centerOfInterests: resData.centerOfInterests,
        publication: resData.publication,
        profession: resData.profession,
        isActivated: resData.isActivated,
      };

      if (resData.profiles) {

        if (Object.entries(resData.profiles).length !== 0) {
          this.hasProfile = true;
          const profiles = [];
          for (const i in resData.profiles){
            if (resData.profiles.hasOwnProperty(i)){
              profiles.push(resData.profiles[i]);
            }
          }
          this.profiles = profiles;
          this.NumberOfPub = Object.entries(resData.publication).length;
        } else {
          this.hasProfile = false;
        }
      }

      if (Object.entries(resData.publication).length !== 0) {
        this.hasPubs = true;
        const pubs = [];
        for (const pub in resData.publication){
          if (resData.publication.hasOwnProperty(pub)){
            pubs.push(resData.publication[pub]);
          }
        }
        this.pubs = pubs;
        this.NumberOfProfile = Object.entries(resData.profiles).length;
      } else {
        this.hasPubs = false;
      }
    });



    this.profileService.getProfession().subscribe(resData  => {
      this.loadedProf = resData;
      this.professionDefault = resData[0].id;

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
        this.success = true;
        setTimeout(() => this.success = false, 3500);
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.failed = true;
        setTimeout(() => this.failed = false, 3500);
      });

  }

  onDelete(id): void {
    this.isLoading = true;
    this.profileAdminService.deleteProfile(id)
      .subscribe(resData => {
        this.isLoading = false;
        this.ngOnInit();
      },  error => console.log(error), this.isLoading = false);
  }
}
