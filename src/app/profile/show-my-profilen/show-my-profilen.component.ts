import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {CardService} from '../../services/card/card.service';
import {UserObject} from '../my-info/my-info.component';
import {Profile} from '../../main/main-default/publication/publication.model';

@Component({
  selector: 'app-show-my-profilen',
  templateUrl: './show-my-profilen.component.html',
  styleUrls: ['./show-my-profilen.component.css']
})
export class ShowMyProfilenComponent implements OnInit {

  userProfiles: Profile[];
  success = false;
  failed = false;
  isLoading = false;



  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe(resData => {
      if (resData.length === 0) {
        this.failed = true;
        this.isLoading = false;
      }else {
        this.userProfiles = resData;
        console.log(this.userProfiles);
        this.isLoading = false;
      }
    });
  }

}
