import { PublicationsService } from '../../../services/publications.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit {
  loadedDetails= [];
  id:number= 0;
  url='https://127.0.0.1:8000/api/publications/2.json';

  constructor(private pubService: PublicationsService) { }

  ngOnInit(): void {
    this.pubService.getPubsWithArgment(this.url)
    .subscribe(publications =>{
      this.loadedDetails = publications;
    }); 
  }
}
