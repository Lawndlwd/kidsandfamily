import { Publication } from './Publication.model';
import { PublicationsService } from '../../../services/publications/publications.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  loadedPub: Publication[] = [];
  publicationId: number ;
  NumberOfPub: number;
  page = 1;



  constructor(
    private pubsService: PublicationsService,
    private router: Router,
    ) {
      this.loadedPub = new Array<any>();
   }

  ngOnInit(): void {
    this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?page=1')
    .subscribe(publications => {
      this.loadedPub = publications;
      this.NumberOfPub = this.loadedPub.length;
    });


    for(let i = 0; i < this.NumberOfPub; i++){
      console.log(this.loadedPub[i]);
    }

  }


  // enDtails(){
  //       this.router.navigate(['/publications-details/]);
  //       this.ngOnInit()
  //     }

}
