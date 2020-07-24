import { Component, OnInit, Input, Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-main-filtre-selection',
  templateUrl: './main-filtre-selection.component.html',
  styleUrls: ['./main-filtre-selection.component.css'],
  
})


export class MainFiltreSelectionComponent implements OnInit {
 
  showL=false;
  showC=true;
  loadedPublication: Publication[] =[];
  publicationId: Number ;
  NumberOfPub: Number;
  page: Number =1;


   @Output() ShowList(){
    this.showL=false;
    this.showC=true;
  }
 
  @Output() ShowCard(){
    
    this.showC=false;
    this.showL=true;
  }


  constructor(
    private pubsService : PublicationsService,
    private router: Router,
    ) {
      this.loadedPublication = new Array<any>();
   }

  ngOnInit(): void {
    this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?page=1')
    .subscribe(publications =>{
      this.loadedPublication = publications; 
      this.NumberOfPub=this.loadedPublication.length;   
    });
  
  }
}
