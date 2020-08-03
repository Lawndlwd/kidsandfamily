import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../../services/profile/profile.service';
import {UserObject} from '../my-info/my-info.component';
import {Profile} from '../../main/main-default/publication/publication.model';
import {CardService} from '../../services/card/card.service';


export class Type {
  id: number;
  type: string;
  sousTypes?: SousType;
}
export class SousType {
  id: number;
  sousType: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {



  constructor(private profileService: ProfileService, private cardService: CardService) { }

  types: Type[];
  sousTypes: SousType[];
  typeSelected = false;
  isLoading = false;
  profile: Profile;
  hasProfiles = false;
  success = false;
  failed = false;


  @ViewChild('myProfileForm') ProfileForm: NgForm;
n;

  ngOnInit(): void {

    this.isLoading = true;
    this.profileService.getUserInfo().subscribe(resData => {
      if (resData.profiles){
        this.hasProfiles = true;
      }

    });



    this.profileService.getTypes().subscribe(resData  => {
      this.types = resData;
      this.isLoading = false;


    });





  }



  // tslint:disable-next-line:typedef
  onTypeSelected(){
    this.isLoading = true;
    const selectedType = this.ProfileForm.value.type;

    this.profileService.getSousTypes(selectedType).subscribe(resData => {
      const arrSousTypes: SousType[] = [];

      // tslint:disable-next-line:forin
      for (const key in resData[0].sousTypes){
        arrSousTypes.push(resData[0].sousTypes[key]);
      }
      this.sousTypes = arrSousTypes;
      this.isLoading = false;
      this.typeSelected = true;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.isLoading = true;

    // if (!this.infoForm.valid){
    //   return;
    // }

    const type = '/api/types/' + this.ProfileForm.value.type;
    const sousType = '/api/sous_types/' + this.ProfileForm.value.sousType;
    const voie = +this.ProfileForm.value.voie;
    const rue = this.ProfileForm.value.rue;
    const adressComplete = this.ProfileForm.value.adressComplete;
    const codePostal = +this.ProfileForm.value.codePostal;
    const city = this.ProfileForm.value.city;
    const state = this.ProfileForm.value.state;
    const country = this.ProfileForm.value.country;
    const address = voie + ' ' + rue + ' ' + city + ' ' + country;

    this.cardService.getLocalisation(address).subscribe(resCor => {
      if (resCor.data[0]) {
        const lon: string = String(resCor.data[0].longitude);
        const lat: string = String(resCor.data[0].latitude);

        this.profileService.createProfile(type, sousType, adressComplete, city, codePostal, country, rue, 1, voie, state, lon, lat)
          .subscribe(resData => {
            console.log(resData);
            this.success = true;
            this.isLoading = false;
          }, error => {
            console.log(error);
            this.failed = true;
            this.isLoading = false;

          });
        }else {
        this.isLoading = false;
        this.failed = true;
      }
      }, error => {
      console.log(error);
    });




  }

}
