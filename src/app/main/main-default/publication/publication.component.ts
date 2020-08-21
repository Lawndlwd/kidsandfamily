import { Publication } from './Publication.model';
import { PublicationsService } from '../../../services/publications/publications.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  loadedPub: Publication[];
  publicationId: number ;
  NumberOfPub: number;
  page = 1;
  usersArray: any;
  searchText = '';



  constructor(
    private pubsService: PublicationsService,
    ) {}

  ngOnInit(): void {
    this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?user.isblocked=0&page=1')
    .subscribe(publications => {
      this.loadedPub = publications;
      this.NumberOfPub = this.loadedPub.length;
    });
  }

}
