import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {Profile, SousType, Type} from '../../main/main-default/publication/publication.model';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import {CardService} from '../../services/card/card.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  id: number;
  isLoading = false;
  success = false;
  failed = false;
  profile: Profile;
  types: Type[];
  sousTypes: SousType[];
  typeSelected = false;
  admin = false;


  @ViewChild('editProfileForm') ProfileForm: NgForm;


  constructor(private location: Location, private route: ActivatedRoute, private profileService: ProfileService, private cardService: CardService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.route.snapshot.params.id;
    this.admin = location.pathname !== 'mon-compte/edit-profile/' + this.id;
    this.profileService.getProfiles(this.id)
      .subscribe(resData => {
        this.profile = resData;
        this.profileService.getSousTypes(this.profile.type.id).subscribe(resType => {
          const arrSousTypes: SousType[] = [];
          // tslint:disable-next-line:forin
          for (const key in resType[0].sousTypes){
            arrSousTypes.push(resType[0].sousTypes[key]);
          }
          this.sousTypes = arrSousTypes;
          this.isLoading = false;
        });
      }, error => {
        console.log(error);

        this.isLoading = false;
      });


    this.profileService.getTypes().subscribe(resData  => {
      this.types = resData;
      this.isLoading = false;
    });



  }

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

  onSubmit(): void{
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
    const country = this.ProfileForm.value.country;
    const state = this.ProfileForm.value.state;
    const address = voie + ' ' + rue + ' ' + city  + ' ' + codePostal + ' ' + country;


    this.cardService.getLocalisation(address).subscribe(resCor => {

      console.log(resCor);
      if (resCor.data[0]) {
        const lon: string = String(resCor.data[0].longitude);
        const lat: string = String(resCor.data[0].latitude);
        this.isLoading = true;
        this.profileService.editProfiles(this.profile.id, type, sousType, city, codePostal, country, rue, voie, state, adressComplete)
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
  }else {
        this.isLoading = false;
        this.failed = true;
        setTimeout(() => this.failed = false, 3500);
      }
    });
  }

  backClicked(): void {
    this.location.back();
  }
}
