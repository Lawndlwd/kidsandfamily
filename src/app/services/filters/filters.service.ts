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
}
