import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {UserObject} from '../../../profile/my-info/my-info.component';
import {MdbTableDirective} from 'angular-bootstrap-md';


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

  @ViewChild(MdbTableDirective, {static: true})
  mdbTable: MdbTableDirective;

  users: UserObject[] ;
  NumberOfPub: number;
  page = 1;
  isLoading = false;
  searchText = '';
  previous: string;

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    this.userService.getListOfUsers().subscribe(resData => {
      this.users = resData;
      console.log(resData);
      this.NumberOfPub = this.users.length;
      this.mdbTable.setDataSource(this.users);
      this.previous = this.mdbTable.getDataSource();

    });
    console.log(this.mdbTable);


  }

  searchItems(): void {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.users = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.users = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
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
