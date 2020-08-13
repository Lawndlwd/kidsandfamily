import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.css']
})
export class AdminEditProfileComponent implements OnInit {
admin = true;
  constructor() { }

  ngOnInit(): void {
  }

}
