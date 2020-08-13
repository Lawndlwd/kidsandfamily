import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user/user.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
