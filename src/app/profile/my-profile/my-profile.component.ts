import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../../services/profile/profile.service';


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

  types: Type[];
  sousTypes: SousType[];
  userProfiles: any[];
  typeSelected = false;
  isLoading = false;


  @ViewChild('myProfileForm') ProfileForm: NgForm;



  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.profileService.getUserInfo().subscribe(resData => {
      const arrUserProfiles: any[] = [];

      // tslint:disable-next-line:forin
      for (const key in resData.profiles){
        arrUserProfiles.push(resData.profiles[key]);
      }
      console.log(arrUserProfiles);
    });
    this.profileService.getTypes().subscribe(resData  => {
      this.types = resData;
      this.isLoading = false;
      console.log(this.types);

    });
  }

  onSubmit(){}

  onTypeSelected(){
    this.isLoading = true;
    const selectedType = this.ProfileForm.value.type;

    this.profileService.getSousTypes(selectedType).subscribe(resData => {
      const arrSousTypes: SousType[] = [];

      // tslint:disable-next-line:forin
      for (const key in resData[0].sousTypes){
        arrSousTypes.push(resData[0].sousTypes[key]);
      }
      console.log(arrSousTypes);
      this.sousTypes = arrSousTypes;
      console.log(this.sousTypes);
      this.isLoading = false;
      this.typeSelected = true;
    });
  }

}
