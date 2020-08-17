import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Profile} from '../../../main/main-default/publication/publication.model';
import {ProfileAdminService} from '../../service/profile/profile-admin.service';
import * as Chart from 'chart.js';
import {ProfileService} from '../../../services/profile/profile.service';
import {Type} from '../../../profile/my-profile/my-profile.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-show-profiles',
  templateUrl: './show-profiles.component.html',
  styleUrls: ['./show-profiles.component.css']
})
export class ShowProfilesComponent implements OnInit {


  profiles: any ;
  types: any[];
  arrType = [];
  NumberOfPub: number;
  page = 1;
  isLoading = false;
  typeObject: {};


  constructor(private profileAdminService: ProfileAdminService, private profileService: ProfileService  ) { }

  ngOnInit(): void {
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
