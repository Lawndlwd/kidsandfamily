import { map } from 'rxjs/operators';
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

  loadedPublication = [];
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

  // map
  markerClusters = new L.markerClusterGroup();

  constructor(
    public http: HttpClient,
    public pubsService: PublicationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadedPublication = new Array<any>();
  }

  ngOnInit(): void {
    // initialize Leaflet
    const macarte = L.map('map', {center : [38,8], maxZoom :20 }).setView([48.8587741, 2.2069771], 5 );
    
    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1
      // maxZoom: 20,
    }).addTo(macarte);

    // réinitialisation des publications filtrées avec nouveaux filtres en paramètres 
    this.route.queryParams.subscribe(params => {
      // réinitialisation de _params et loadedPublication
      this._params = '';
      this.loadedPublication = [];

      // mise à jour de la requête d'après les filtres ajoutés ou supprimés
      this.profiles = params.profil;
      this.publics = params.public;
      this.themes = params.theme;
      this.actions = params.action;
      this.structures = params.structure;
      this.regions = params.region;

      this.createRequestParams();
      
      this.pubsService.getFilteredPubs(this._url + this._params)
        .subscribe(publications => {

        if (macarte.hasLayer(this.markerClusters)) {
          this.markerClusters.clearLayers();
        }  

        for (let i in publications) {
          this.loadedPublication.push(publications[i]);

          const publication = publications[i];
          
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
            '</div> </div>';

            // const marker = L.marker([publication.profile.lat, publication.profile.lan]).addTo(macarte);
            const marker = L.marker([publication.profile.lat, publication.profile.lan]);
            
            marker.bindPopup(pubDetails);
            this.markerClusters.addLayer(marker);
            macarte.addLayer(this.markerClusters);
        } // endfor
        this.NumberOfPub = this.loadedPublication.length;
      }); // end pubsService
    }); //end route.queryParams.subscribe
    
  }  
  //ngOnInit()

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
      // ajouter traitement du filtre region après ajout du champ en base de données
    }
  }
}
