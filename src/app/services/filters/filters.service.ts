import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private url: string = 'https://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get(this.url + 'types.json');
  }

  getPublics() {
    return this.http.get(this.url + 'public_cibles.json');
  }

  getThemes() {
    return this.http.get(this.url + 'themes.json');
  }

  getActions() {
    return this.http.get(this.url + 'actions.json');
  }

  getStructures() {
    return this.http.get(this.url + 'structures.json');
  }

  getRegions() {
    return [
      {
        id: 84,
        nom: "Auvergne-Rhône-Alpes"
      },
      {
        id: 27,
        nom: "Bourgogne-Franche-Comté"
      },
      {
        id: 53,
        nom: "Bretagne"
      },
      {
        id: 24,
        nom: "Centre-Val de Loire"
      },
      {
        id: 94,
        nom: "Corse"
      },
      {
        id: 44,
        nom: "Grand-Est"
      },
      {
        id: 32,
        nom: "Hauts-de-France"
      },
      {
        id: 11,
        nom: "Ile-de-France"
      },
      {
        id: 28,
        nom: "Normandie"
      },
      {
        id: 75,
        nom: "Nouvelle-Aquitaine"
      },
      {
        id: 76,
        nom: "Occitanie"
      },
      {
        id: 52,
        nom: "Pays de la Loire"
      },
      {
        id: 93,
        nom: "Provence-Alpes-Côte d'Azur"
      } 
    ]
  }
}
