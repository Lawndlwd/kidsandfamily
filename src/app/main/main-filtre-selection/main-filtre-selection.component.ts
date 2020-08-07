import { Component, OnInit,Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient, XhrFactory } from '@angular/common/http';
import { Xliff2 } from '@angular/compiler';
import { concatMap, flatMap } from 'rxjs/operators';
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
  markers;
  NumberOfPub: Number;
  isLoading;
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
      this.markers = new Array<any>();
     }

  ngOnInit(): void {

    this.isLoading = true;
    
    const macarte = L.map('map', {center : [38,8], maxZoom :20 }).setView([48.8587741, 2.2069771], 5 );
  
    
    const markerClusters = L.markerClusterGroup();
    const layerGroup = L.layerGroup()
    

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20,
    }).addTo(macarte);
   
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
      this.markers = [];
      //  this.macarte='',
      this.createRequestParams();
      
      // L.Map.include({
      //   'clearLayers': function () {
      //     this.eachLayer(function (markers) {
      //       this.removeLayer(markers);
      //       this.removeMarker(markers);
      //     }, this);
      //   }
      // });

    //   macarte.eachLayer(function (layer) {
    //     // macarte.removeLayer(layer);
       
    // });

    macarte.removeMarkers = function() {
      console.log(this.markers);
      this.markers = [];
      
  }
   
    
      this.pubsService.getFilteredPubs(this._url + this._params)
        .subscribe(publications => {
         
          for (let i in publications) {
          this.loadedPublication.push(publications[i]);
          this.NumberOfPub=this.loadedPublication.length;
          const publication = publications[i];
          const adresse = publication.profile.numVoie + ' ' + publication.profile.nameVoie + ' '
          + publication.profile.codePostal+ ' ' + publication.profile.city + ' ' + publication.profile.country;
 
         const pubDetails = '<strong>' + publication.user.firstName + '</strong><br>' + publication.title + '<br>' +
         publication.action.actions + '<br>' + publication.profile.type.type + '<br>' + publication.publicCible.name +
         '<br>' + publication.theme.theme +'<br><a  href=\'/publications-details/' + publication.id + '\'>' + 'Voir le détail</a>';
         this.getCor(adresse).subscribe(response=> {

           if (Object.keys(response.data[0]).length !== 0) {
            var marker = L.marker([response.data[0].latitude, response.data[0].longitude]).addTo(macarte);
            marker.bindPopup(pubDetails);
            markerClusters.addLayer(marker);
           this.markers.push(marker);
           macarte.addLayer(markerClusters);
            // if (macarte.hasLayer(layerGroup)) {           
            //   console.log("count1 =>", macarte.hasLayer(layerGroup));
            //     layerGroup.clearLayers();
            //     macarte.removeLayer(layerGroup);             
            //       }else {
            //         console.log("count2 =>", macarte.hasLayer(layerGroup));  
            //       }
           }
         });

        }//endfor

        // if (macarte.hasLayer(layerGroup)) {
        //   console.log("count1 =>", macarte.hasLayer(layerGroup));
        //     layerGroup.clearLayers();
        //     macarte.removeLayer(layerGroup);
        //       }else {
        //         console.log("count2 =>", macarte.hasLayer(layerGroup));
        //       }
      });
    });
    
    this.isLoading = false;

  }  //ngOnInit()

  getCor(infos){
    const key = 'dad06ede9d99985348d1d5801c524a52';
    const limit = 1;
    return this.http.get<ResData>('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+infos+'&limit=1');
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
