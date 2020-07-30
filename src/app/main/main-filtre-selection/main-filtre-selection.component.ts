import { Component, OnInit, Input, Output } from '@angular/core';
import { Publication } from '../main-default/publication/Publication.model';
import { PublicationsService } from '../../services/publications/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient, XhrFactory } from '@angular/common/http';
import { Xliff2 } from '@angular/compiler';
declare var L: any;
declare var pubs: any;


@Component({
  selector: 'app-main-filtre-selection',
  templateUrl: './main-filtre-selection.component.html',
  styleUrls: ['./main-filtre-selection.component.css'],
  
})

export class MainFiltreSelectionComponent implements OnInit {
            
  showL=false;
  showC=true;
  loadedPublication: Publication[] =[];
  page: Number =1;

   @Output() ShowList(){
    this.showL=false;
    this.showC=true;
  }
  @Output() ShowCard(){
    this.showC=false;
    this.showL=true;
  }
  constructor(
     private http: HttpClient,
     private pubsService : PublicationsService,
     private router: Router)
     {
      this.loadedPublication = new Array<any>();
     }
  

  getCor(email){
    const key:string = 'dad06ede9d99985348d1d5801c524a52';
    const limit:number= 1;
    return this.http.get('http://api.positionstack.com/v1/forward?access_key='+key+'&query='+email+'&limit=1');
  }

  ngOnInit(): void {

    var macarte = L.map('map').setView([48.8587741, 2.2069771],5);
    var markers = [];
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte);

    var markerClusters = L.markerClusterGroup();

    this.pubsService.getPubsNoArgment('https://127.0.0.1:8000/api/publications.json?page=1').subscribe(publications =>{
    this.loadedPublication = publications;
    let x = this.loadedPublication.length; 
    
    for (let key = 0; key < this.loadedPublication.length; key++) {
      
      var publication = this.loadedPublication[key];
      
      let adresse = publication.profile.numVoie+' '+publication.profile.nameVoie+' '+publication.profile.codePostal +' '+
      publication.profile.city +' '+publication.profile.country;

       
      
      var pubDetails = "<strong>"+publication.user.firstName +"</strong><br>" + publication.title + "<br>" +
      publication.action.actions +"<br><a  href='/publications-details/"+publication.id+"'>"+"Voir le détail</a>";
       console.log(pubDetails);
        this.getCor(adresse).subscribe(data=>
          {
         if (Object.keys(data.data[0]).length !== 0) {
            var marker = L.marker([data.data[0].latitude, data.data[0].longitude]).addTo(macarte);
           
             marker.bindPopup(pubDetails);
            
             markerClusters.addLayer(marker);
             markers.push(marker);
         }
        
         });  
         macarte.addLayer(markerClusters);   
     }

    });
    
  }
}
