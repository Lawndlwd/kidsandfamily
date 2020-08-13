import { Component, OnInit, Output } from '@angular/core';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
declare const L: any;

export class ResData {
  data: adresseData[];
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
  @Output() ShowList(){
    this.showL = false;
    this.showC = true;
  }
  @Output() ShowCard(){
    this.showC = false;
    this.showL = true;
  }
  loadedPublication;
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
    return this.http.get<ResData>('http://api.positionstack.com/v1/forward?access_key=' + key + '&query=' + infos + '&limit=1');
  }

  ngOnInit(): void {

    const macarte = L.map('map', {center : [38,8], maxZoom :20 }).setView([48.8587741, 2.2069771], 5 );
    const markers = [];
    const markerClusters = new L.markerClusterGroup();


    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1
      // maxZoom: 20,
    }).addTo(macarte);

    // récupération des paramètres de la requête
    this.route.queryParams.subscribe(params => {
      this.profiles = params.profil;
      this.publics = params.public;
      this.themes = params.theme;
      this.actions = params.action;
      this.structures = params.structure;
      this.regions = params.region;

      this._params = '';
      this.loadedPublication = [];

      markerClusters.clearLayers();

      this.createRequestParams();


      this.pubsService.getFilteredPubs(this._url + this._params)
        .subscribe(publications => {

          for (let i in publications) {
          this.loadedPublication.push(publications[i]);
          this.NumberOfPub=this.loadedPublication.length;

          const publication = this.loadedPublication[i];
          console.log(publication);
          const adresse = publication.profile.numVoie + ' ' + publication.profile.nameVoie + ' '
          + publication.profile.codePostal+ ' ' + publication.profile.city + ' ' + publication.profile.country;

          const pubDetails = '<div class="card h-100 ">' +
        '<span class="card-subtitle py-2 pl-3 mb-2 text-muted">' +  publication.user.firstName +'<br>'+ publication.profile.type.type + '</span>' +
          '<span class="card-subtitle py-1 pl-3 text-muted">' + publication.createdAtAgo + '</span>' +
        '<img src="https://picsum.photos/400/200" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h6 class="card-title">' + publication.title + '</h6>' +
        '<span class="card-subtitle mb-2 text-muted">   ' +  publication.theme.theme + '  |</span>' +
          '<span class="card-subtitle mb-2 text-muted">   ' + publication.action.actions + '  |</span>' +
          '<p class="card-subtitle mb-2 text-muted"> ' +  publication.publicCible.name + '</p>' +
          '<div class=" row justify-content-end">' +
          '<a mdbBtn class="card-link " size="sm" color="deep-purple" mdbWavesEffect href=\'/publications-details/' + publication.id + '\'>' + 'Voir le détail</a>'
          this.getCor(adresse).subscribe(response=> {

            if (Object.keys(response.data[0]).length !== 0) {
             const marker = L.marker([response.data[0].latitude, response.data[0].longitude]).addTo(macarte);

             marker.bindPopup(pubDetails);
             markerClusters.addLayer(marker);
            markers.push(marker);
            macarte.addLayer(markerClusters);
               }
          });
      '</div> </div>';


        } // endfor
      }); // end pubsService
    }); //end route.queryParams.subscribe

  }  //ngOnInit()

createRequestParams() {
    // traitement filtre profile
  if (this.profiles){
    if (this.profiles.length !== 0) {
      for (const i in this.profiles) {
        this._params += 'profile.type.id[]=' + this.profiles[i] + '&';
      }
    }
  }
    // traitement filtre public
  if (this.publics){
  if (this.publics.length !== 0) {
      for (const i in this.publics) {
        this._params += 'publicCible.id[]=' + this.publics[i] + '&';
      }
    }
  }
    // traitement filtre theme
  if (this.themes){
  if (this.themes.length !== 0) {
      for (const i in this.themes) {
        this._params += 'theme.id[]=' + this.themes[i] + '&';
      }
    }
  }
    // traitement filtre action
  if (this.actions){
  if (this.actions.length !== 0) {
      for (const i in this.actions) {
        this._params += 'action.id[]=' + this.actions[i] + '&';
      }
    }
}
    // traitement filtre structure
  if (this.structures) {
    if (this.structures.length !== 0) {
      for (const i in this.structures) {
        this._params += 'structure.id[]=' + this.structures[i] + '&';
      }
    }
  }
    // ajouter traitement du filtre region après ajout du champen base de données
  }
}
