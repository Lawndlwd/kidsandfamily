import { PublicationsService } from '../../../services/publications/publications.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit {
  loadedDetails = [];
  id: number;
  url = 'https://127.0.0.1:8000/api/publications/';

  constructor(private pubService: PublicationsService, private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    // this.route.params
    // .subscribe((params: Params) =>{
    //     this.id = params['id'];
    // })

    this.pubService.getPubsWithArgment(this.url + this.id + '.json?user.isBlocked=0&page=1')
    .subscribe(publications => {
      this.loadedDetails = publications;
    });

  }
}
