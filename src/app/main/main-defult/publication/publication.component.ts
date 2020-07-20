import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  private url= 'https://127.0.0.1:8000/api/publications.json?page=';
  loadedPub= [];

  constructor(private http : HttpClient) {
   }

  ngOnInit(): void {
    this.http.get(this.url+'1')
    .pipe(map (responseData => {
      let arrPub =[];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)){
          arrPub.push({...responseData[key], id: key})
        }
      }
      return arrPub;
    }))
    .subscribe(publications =>{
      this.loadedPub = publications;
    });

  }

  onPub(){

  this.http.get(this.url+'2')
    .pipe(map (responseData => {
      let arrPub =[];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)){
          arrPub.push({...responseData[key], id: key})
        }
      }
      return arrPub;
    }))
    .subscribe(publications =>{
      this.loadedPub = publications;
    });
  }
}
