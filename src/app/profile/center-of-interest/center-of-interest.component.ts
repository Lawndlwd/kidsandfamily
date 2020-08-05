import {Component, OnInit, ViewChild} from '@angular/core';
import {CenterOfIntreset, ProfileService} from '../../services/profile/profile.service';
import {NgForm} from '@angular/forms';
import {UserObject} from '../my-info/my-info.component';

@Component({
  selector: 'app-center-of-interest',
  templateUrl: './center-of-interest.component.html',
  styleUrls: ['./center-of-interest.component.css']
})
export class CenterOfInterestComponent implements OnInit {


  constructor(private profileService: ProfileService) { }

  interests: CenterOfIntreset[];
  int: any[] = [];
  idOfCenter: any[] = [];
  idOfCentere: any[] = [];
  loadedData: CenterOfIntreset;
  isLoading = false;
  id: number;

  @ViewChild('centreOfInterest') checkForm: NgForm ;

  // tslint:disable-next-line:typedef
  check: any;
  ngOnInit(): void {
    this.profileService.getInterest().subscribe(resData => {
      this.interests = resData;
    }, error => console.log(error));

    this.isLoading = true;

    this.profileService.getUserInfo().subscribe(resData => {

      this.id = resData.id;
      this.loadedData = resData.centerOfInterests;
      this.int.push(resData.centerOfInterests);
      console.log(this.loadedData);

      this.isLoading = false;
    }, error => {
      console.log(error);
    });

  }

  // tslint:disable-next-line:typedef
  onCheck(evt)
  {
    const intrest = {};
    if (!this.int.includes(evt)) {
      this.int.push(evt);
    } else {
      const index = this.int.indexOf(evt);
      if (index > -1) {
        this.int.splice(index, 1);
      }
    }
    console.log(this.int);
  }

  onSubmit(): void {

    // tslint:disable-next-line:prefer-for-of
    this.profileService.setCenterOfIntreset(this.id, [{id: 3}]).subscribe(resData => {

      console.log(resData.centerOfInterests);
      console.log(this.interests);
      this.int = [];
    }, error => {
      console.log(error);
    });

  }

  hgj(): void{
    console.log(this.idOfCenter);
  }

}


// for (const key in this.idOfCenter) {
//
//   if (this.idOfCentere.includes(this.idOfCenter[key])) {
//   }
// }

// for (const key in resData.centerOfInterests){
//   this.idOfCentere.push(resData[key].id);
//
//   resData[key].checked = false;
// }
// for (const key in resData.centerOfInterests) {
//   if (resData.centerOfInterests.hasOwnProperty(key)) {
//     const result = resData.centerOfInterests[key].split('/');
//     if (!this.idOfCenter.includes(+result[3])) {
//       this.idOfCenter.push( +result[3]);
//     } else {
//       const index = this.idOfCenter.indexOf( +result[3]);
//       if (index > -1) {
//         this.idOfCenter.splice(index, 1);
//       }
//     }
//   }
// }

// // tslint:disable-next-line:forin
// for (const key in resData){
//   this.idOfCentere.push(resData[key].id);
//
//   resData[key].checked = false;
// }
// console.log(this.idOfCentere);
// console.log(this.idOfCenter);
