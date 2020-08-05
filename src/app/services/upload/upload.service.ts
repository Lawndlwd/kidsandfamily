import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  publicationPicture(formData: FormData, token) {
    // token utilisateur connecté pour envoyer données à l'api
    const authorizationToken = new HttpHeaders({
      Authorization: 'Bearer ' + token._token
    });

    return this.http.post(
      'https://localhost:8000/api/publication_pictures',
      formData,
      { headers: authorizationToken }
    );
  }  
}
