import { Component, OnInit, Input, Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  // lat:number = 48.852969;
  // lon:number = 2.349903;
  // macarte = null;
  villes = {
    "Paris": { "lat": 48.852969, "lon": 2.349903 },
    "Brest": { "lat": 48.383, "lon": -4.500 },
    "Quimper": { "lat": 48.000, "lon": -4.100 },
    "Bayonne": { "lat": 43.500, "lon": -1.467 },
    "Mureaux": { "lat": 48.9749837, "lon": 1.9161322},
    "redone": { "lat": 9.89865144, "lon": 2.2145973}
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
    private route: ActivatedRoute,
    private http: HttpClient
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
     var macarte = L.map('map').setView([48.8587741, 2.2069771],6);
    // this.macarte = L.map('map').setView([this.lat, this.lon], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte);

    // this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?page=1')
    // .subscribe(publications =>{
    //   this.loadedPublication = publications; 
    //   this.NumberOfPub=this.loadedPublication.length; 

    //   for(var key in this.loadedPublication) {

    //     var publication = this.loadedPublication[key];
    //     let adresse = publication.profile.numVoie+' '+publication.profile.nameVoie+' '+publication.profile.codePostal +' '+
    //     publication.profile.city +' '+publication.profile.country
    //     this.getCor(adresse).subscribe(data=>{
      
    //      if (Object.keys(data.data[0]).length !== 0) {

    //       console.log(data.data[0].latitude, data.data[0].longitude);
    //         var marker = L.marker([data.data[0].latitude, data.data[0].longitude]).addTo(macarte);

            
    //         marker.bindPopup(data.data[0]);
    //      }
        
    //     });     
    //  }
    
      
    // });
    
  }

  getCor(email){
    const key:string = 'dad06ede9d99985348d1d5801c524a52';
    const limit:number= 1;
    return this.http.get('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+email+'&limit=1');
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
