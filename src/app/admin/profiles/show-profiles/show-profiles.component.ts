import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ProfileAdminService} from '../../service/profile/profile-admin.service';
import {ProfileService} from '../../../services/profile/profile.service';
import {MdbTableDirective, MdbTableService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-show-profiles',
  templateUrl: './show-profiles.component.html',
  styleUrls: ['./show-profiles.component.css'],
})

export class ShowProfilesComponent implements OnInit, AfterViewInit {
  @ViewChild ( MdbTableDirective, {static: true} ) mdbTable: MdbTableDirective;


  profiles: any ;
  types: any[];
  arrType = [];
  NumberOfPub: number;
  page = 1;
  isLoading = false;
  typeObject: {};
  searchText = '';
  previous: string;

  constructor(private profileAdminService: ProfileAdminService, private profileService: ProfileService  ) { }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }


  ngOnInit(): void {
    console.log(this.mdbTable);
    this.isLoading = true;
    this.profileAdminService.getListOfProfile().subscribe(resData => {
      this.profiles = resData;
      this.NumberOfPub = this.profiles.length;


    }, error => console.log(error));

    this.isLoading = true;
    this.profileAdminService.getTypes().subscribe(resData => {
      this.types = resData;
      const typeLenght = [];
      // tslint:disable-next-line:forin
      for (const key in this.types) {
        this.profileAdminService.getNumOfPubs(this.types[key])
          .subscribe(resData1 => {
              // typeLenght.push(resData1);
               typeLenght.push(resData1);
               this.arrType = typeLenght;


               const result = {};
            // tslint:disable-next-line:no-shadowed-variable
               this.types.forEach((key, i) => result[key] = this.arrType[i]);
               this.typeObject = result;
               console.log(result);
               console.log(this.arrType);
               this.isLoading = false;

            }, error => console.log(error)
          );
      }

      this.isLoading = false;

      console.log(this.types);
    });


  }


  ngAfterViewInit(): void {
    console.log(this.mdbTable); // correctly outputs the element in console, not undefined
    this.mdbTable.setDataSource(this.profiles);
    this.previous = this.mdbTable.getDataSource();
  }
  searchItems(): void {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.profiles = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.profiles = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


  onDelete(id): void {
    this.isLoading = true;
    this.profileAdminService.deleteProfile(id)
      .subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
      },  error => console.log(error), this.isLoading = false);
  }

  // chartBar(): void {
  //   // tslint:disable-next-line:forin
  //
  //   const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');
  //     // @ts-ignore
  //   const chart = new Chart(ctx, {
  //       // The type of chart we want to create
  //       type: 'bar',
  //
  //       // The data for our dataset
  //       data: {
  //         labels: this.types,
  //         datasets: [{
  //           label: '#',
  //           backgroundColor: '#58b9cc',
  //           hoverBackgroundColor: '#2e59d9',
  //           borderColor: '#4e73df',
  //           data: this.arrType,
  //         }]
  //       },
  //
  //       // Configuration options go here
  //       options: {},
  //     });
  //   }

}
