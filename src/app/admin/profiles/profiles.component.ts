import {Component, OnInit} from '@angular/core';
import {ProfileAdminService} from '../service/profile/profile-admin.service';
import {Profile} from '../../main/main-default/publication/publication.model';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
