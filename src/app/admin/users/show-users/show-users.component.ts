import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {UserObject} from '../../../profile/my-info/my-info.component';


export interface UserAdmin {
  LastName: string;
  firstName: string;
  gender: string;
  email: string;
  createdAt: Date;
}
@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  headElements = ['First Name', 'Last Name', 'Email', 'Gender', 'Created at'];
  users: UserObject[] ;
  NumberOfPub: number;
  page = 1;
  isLoading = false;


  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.getListOfUsers().subscribe(resData => {
      this.users = resData;
      this.NumberOfPub = this.users.length;

    });


  }


  onDelete(id: number): void {
    // this.userService.deleteUser(id).subscribe(resData => {
    // });
    this.userService.deleteUser(id).subscribe(resData1 => {
      this.userService.getListOfUsers().subscribe(resData => {
        this.users = resData;
        this.NumberOfPub = this.users.length;
      });
    });
  }

  deletePubsAndProfiles(): void{
    // this.userService.getPubsOfUser().subscribe(resData => {
    //   console.log(resData);
    // });
    // this.userService.deleteUser(id).subscribe(resData1 => {
    //   this.userService.getListOfUsers().subscribe(resData => {
    //     this.users = resData;
    //     this.NumberOfPub = this.users.length;
    //   });
    // });
  }

}
