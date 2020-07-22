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
        code: 84,
        nom: "Auvergne-Rhône-Alpes"
      },
      {
        code: 27,
        nom: "Bourgogne-Franche-Comté"
      },
      {
        code: 53,
        nom: "Bretagne"
      },
      {
        code: 24,
        nom: "Centre-Val de Loire"
      },
      {
        code: 94,
        nom: "Corse"
      },
      {
        code: 44,
        nom: "Grand-Est"
      },
      {
        code: 32,
        nom: "Hauts-de-France"
      },
      {
        code: 11,
        nom: "Ile-de-France"
      },
      {
        code: 28,
        nom: "Normandie"
      },
      {
        code: 75,
        nom: "Nouvelle-Aquitaine"
      },
      {
        code: 76,
        nom: "Occitanie"
      },
      {
        code: 52,
        nom: "Pays de la Loire"
      },
      {
        code: 93,
        nom: "Provence-Alpes-Côte d'Azur"
      } 
    ]
  }
}
