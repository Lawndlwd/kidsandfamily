import { Component, OnInit,Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute ,Router } from '@angular/router';
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
  // filters params infos
  profiles: string[] = [];
  publics: string[] = [];
  themes: string[] = [];
  actions: string[] = [];
  structures: string[] = [];
  regions: string[] = [];



  private _url: string = 'https://127.0.0.1:8000/api/publications.json?';
  private _params: string;


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
     private router: Router,
     private route: ActivatedRoute)
     {
      this.loadedPublication = new Array<any>();
     }

  getCor(infos){
    const key = 'dad06ede9d99985348d1d5801c524a52';
    const limit = 1;
    return this.http.get<ResData>('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+infos+'&limit=1');
  }

  ngOnInit(): void {
    // récupération des paramètres de la requête
    this.route.queryParams.subscribe(params => {
      this.profiles = params['profil'];
      this.publics = params['public'];
      this.themes = params['theme'];
      this.actions = params['action'];
      this.structures = params['structure'];
      this.regions = params['region'];

      this._params = '';
      this.loadedPublication = [];

      this.createRequestParams();

      this.pubsService.getFilteredPubs(this._url + this._params)
        .subscribe(publications => {
          for (let i in publications) {
          this.loadedPublication.push(publications[i]);
          this.NumberOfPub=this.loadedPublication.length;
        }
      });
    });
    

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

 

  createRequestParams() {
    // traitement filtre profile
    if (this.profiles.length != 0) {
      for (let i in this.profiles) {
        this._params += 'profile.type.id[]=' + this.profiles[i] + '&';
      }
    }

    // traitement filtre public
    if (this.publics.length != 0) {
      for (let i in this.publics) {
        this._params += 'publicCible.id[]=' + this.publics[i] + '&';
      }
    }

    // traitement filtre theme
    if (this.themes.length != 0) {
      for (let i in this.themes) {
        this._params += 'theme.id[]=' + this.themes[i] + '&';
      }
    }

    // traitement filtre action
    if (this.actions.length != 0) {
      for (let i in this.actions) {
        this._params += 'action.id[]=' + this.actions[i] + '&';
      }
    }

    // traitement filtre structure
    if (this.structures.length != 0) {
      for (let i in this.structures) {
        this._params += 'structure.id[]=' + this.structures[i] + '&';
      }
    }

    // ajouter traitement du filtre region après ajout du champen base de données
  }


}
