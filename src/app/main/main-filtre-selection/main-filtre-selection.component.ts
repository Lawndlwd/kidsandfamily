import { Component, OnInit, Input, Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
// declare var ol: any;
declare var L: any;
@Component({
  selector: 'app-main-filtre-selection',
  templateUrl: './main-filtre-selection.component.html',
  styleUrls: ['./main-filtre-selection.component.css'],

})

export class MainFiltreSelectionComponent implements OnInit {

  // longitude: number = 2.2069771;
  // latitude: number = 48.8587741;
  // map: any;

  lat:number = 48.852969;
  lon:number = 2.349903;
  macarte = null;
  villes = {
    "Paris": { "lat": 48.852969, "lon": 2.349903 },
    "Brest": { "lat": 48.383, "lon": -4.500 },
    "Quimper": { "lat": 48.000, "lon": -4.100 },
    "Bayonne": { "lat": 43.500, "lon": -1.467 }
            };

  showL=false;
  showC=true;
  loadedPublication = [];
  publicationId: Number ;
  NumberOfPub: Number;
  page: Number =1;

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
    private route: ActivatedRoute
  ) {
    this.loadedPublication = new Array<any>();
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

    this.macarte = L.map('map').setView([this.lat, this.lon], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      // Il est toujours bien de laisser le lien vers la source des données
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.macarte);

    for (let ville in this.villes) {
      var marker = L.marker([this.villes[ville].lat, this.villes[ville].lon]).addTo(this.macarte);
          marker.bindPopup(ville);
     }
  //   var mousePositionControl = new ol.control.MousePosition({
  //     // coordinateFormat: ol.coordinate.createStringXY(4),
  //     // projection: 'EPSG:4326',
  //     // comment the following two lines to have the mouse position
  //     // be placed within the map.
  //     className: 'custom-mouse-position',
  //     target: document.getElementById('mouse-position'),
  //     undefinedHTML: '&nbsp;'
  //   });

  //   this.map = new ol.Map({
  //     target: 'map',
  //     controls: ol.control.defaults({
  //       attributionOptions: {
  //         collapsible: false
  //       }
  //     }).extend([mousePositionControl]),
  //     layers: [
  //       new ol.layer.Tile({
  //         source: new ol.source.OSM()
  //       })
  //     ],
  //     view: new ol.View({
  //       center: ol.proj.fromLonLat([2.2069771,48.8587741]),
  //       zoom: 11,
  //       minzoom:1,
  //       maxzoom:20
  //     })
  //   });

  //   this.map.on('click', function (args) {
  //     console.log(args.coordinate);
  //     var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
  //     console.log(lonlat);

  //     var lon = lonlat[0];
  //     var lat = lonlat[1];
  //    // alert(`lat: ${lat} long: ${lon}`);
  //   });

  // }

  // setCenter() {
  //   var view = this.map.getView();
  //   view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
  //   view.setZoom(8);


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
