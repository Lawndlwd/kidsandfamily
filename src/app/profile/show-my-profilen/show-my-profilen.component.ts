import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {CardService} from '../../services/card/card.service';
import {UserObject} from '../my-info/my-info.component';
import {Profile} from '../../main/main-default/publication/publication.model';
import {ModalDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';

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
  noProfiles = false;
  @ViewChild('basicModal', { static: false }) demoBasic: ModalDirective;



  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe(resData => {
      if (resData.length === 0) {
        this.isLoading = false;
        this.noProfiles = true;
      }else {
        this.userProfiles = resData;
        this.isLoading = false;
      }
    });
  }

  onDelete(id: number): void {
    this.isLoading = true;
    this.profileService.deleteProfile(id).subscribe(resData => {
      this.isLoading = false;
      this.ngOnInit();

    }, error => {
      console.log(error);
      this.isLoading = false;
    });




  }

}
