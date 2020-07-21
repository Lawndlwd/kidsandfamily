import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get('http://localhost:8000/api/types.json');
  }

  getPublics() {
    return this.http.get('http://localhost:8000/api/public_cibles.json');
  }

  getThemes() {
    return this.http.get('http://localhost:8000/api/themes.json');
  }

  getActions() {
    return this.http.get('http://localhost:8000/api/actions.json');
  }

  getStructures() {
    return this.http.get('http://localhost:8000/api/structures.json');
  }

  getRegions() {
    return [
      { code: 1, nom: "Bourgogne" }, 
      { code: 2, nom: "Centre" } 
    ]
  }
}
