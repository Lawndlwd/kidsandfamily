import { PublicationsService } from '../../../services/publications/publications.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Publication} from '../publication/publication.model';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit {
  loadedDetails: Publication[] = [];
  id: number;
  url = 'https://lit-depths-70205.herokuapp.com/api/publications/';

  constructor(private pubService: PublicationsService, private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.pubService.getPubsWithArgment(this.url + this.id + '.json?user.isBlocked=0&page=1')
    .subscribe(publications => {
      this.loadedDetails = publications;
    });

  }
}
