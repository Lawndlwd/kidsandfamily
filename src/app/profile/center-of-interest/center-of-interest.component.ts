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
  loadedData: UserObject;
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
      this.loadedData = resData;
      this.int = resData.centerOfInterests;
      this.isLoading = false;
    }, error => {
      console.log(error);
    });

  }

  // tslint:disable-next-line:typedef
  onCheck(evt)
  {
    if (!this.int.includes('/api/center_of_interests/' + evt)) {
      this.int.push('/api/center_of_interests/' + evt);
    } else {
      const index = this.int.indexOf('/api/center_of_interests/' + evt);
      if (index > -1) {
        this.int.splice(index, 1);
      }
    }
  }

  onSubmit(): void {

    // tslint:disable-next-line:prefer-for-of
    this.profileService.setCenterOfIntreset(this.id, this.int).subscribe(resData => {
      for (const key in resData.centerOfInterests) {
        if (resData.centerOfInterests.hasOwnProperty(key)) {
          const result = resData.centerOfInterests[key].split('/');
          if (!this.idOfCenter.includes(+result[3])) {
            this.idOfCenter.push( +result[3]);
          } else {
            const index = this.idOfCenter.indexOf( +result[3]);
            if (index > -1) {
              this.idOfCenter.splice(index, 1);
            }
          }
        }
      }
      console.log(this.idOfCenter);
      console.log(this.interests);
    }, error => {
      console.log(error);
    });

  }


}
