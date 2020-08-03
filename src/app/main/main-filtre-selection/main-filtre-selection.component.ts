import { Component, OnInit,Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

declare const L: any;

export class ResData {
  data:adresseData[];
}

export class adresseData {
  administrativeArea: string;
  confidence: number;
  continent: string;
  country: string;
  countryCode: string;
  county: string;
  label: string;
  latitude: number;
  locality: any;
  longitude: number;
  name: string;
  neighbourhood: string;
  number: string;
  postalCode: string;
  region: string;
  regionCode: string;
  street: string;
  type: string;
}
@Component({
  selector: 'app-main-filtre-selection',
  templateUrl: './main-filtre-selection.component.html',
  styleUrls: ['./main-filtre-selection.component.css'],
})

export class MainFiltreSelectionComponent implements OnInit { 
  showL = false;
  showC = true;
  loadedPublication: Publication[] =[];
  NumberOfPub: Number;

  page: Number = 1;

   @Output() ShowList(){
    this.showL = false;
    this.showC = true;
  }
  @Output() ShowCard(){
    this.showC = false;
    this.showL = true;
  }
  constructor(
     public http: HttpClient,
     public pubsService: PublicationsService,
     private router: Router)
     {
      this.loadedPublication = new Array<any>();
     }

  getCor(infos){
    const key = 'dad06ede9d99985348d1d5801c524a52';
    const limit = 1;
    return this.http.get<ResData>('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+infos+'&limit=1');

  }

  ngOnInit(): void {

    const macarte = L.map('map').setView([48.8587741, 2.2069771], 5 );
    const markers = [];
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte);

    const markerClusters = L.markerClusterGroup();

    this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?page=1').subscribe(publications =>
    {
    this.loadedPublication = publications;
    const x = this.loadedPublication.length;

    for (let key = 0; key < this.loadedPublication.length; key++) {
      const publication = this.loadedPublication[key];
      const adresse = publication.profile.numVoie + ' ' + publication.profile.nameVoie + ' ' + publication.profile.codePostal
      + ' ' + publication.profile.city + ' ' + publication.profile.country;

      const pubDetails = '<strong>' + publication.user.firstName + '</strong><br>' + publication.title + '<br>' +
      publication.action.actions + '<br><a  href=\'/publications-details/' + publication.id + '\'>' + 'Voir le détail</a>';
       this.getCor(adresse).subscribe(response=> {
         if (Object.keys(response.data[0]).length !== 0) {
            var marker = L.marker([response.data[0].latitude, response.data[0].longitude]).addTo(macarte);
              marker.bindPopup(pubDetails);
              markerClusters.addLayer(marker);
              markers.push(marker);  
             }});
         macarte.addLayer(markerClusters); 
      }
    });
  }
}
