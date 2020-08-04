import { Component, OnInit } from '@angular/core';
import {CenterOfIntreset, ProfileService} from '../../services/profile/profile.service';

@Component({
  selector: 'app-center-of-interest',
  templateUrl: './center-of-interest.component.html',
  styleUrls: ['./center-of-interest.component.css']
})
export class CenterOfInterestComponent implements OnInit {

  interest: CenterOfIntreset[];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getInterest().subscribe(resData => {
      this.interest = resData;
      console.log(this.interest);
    }, error => console.log(error));
  }

  onSelected(e): void {

    if (e.target.checked){
      alert(e.target.checked);
    }
  }

}
