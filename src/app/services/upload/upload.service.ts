import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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

  deletePublicationPicture(publicationPictureId, token) {
    // token utilisateur connecté pour envoyer données à l'api
    const authorizationToken = new HttpHeaders({
      Authorization: 'Bearer ' + token._token
    });

    return this.http.delete(
      `https://localhost:8000/api/publication_pictures/${publicationPictureId}`,
      { headers: authorizationToken }
    );
  }

  inversePriority(pubPicture_1, pubPicture_2, token) {
    const priorityPubPicture_2 = pubPicture_2['priority'];

    // token utilisateur connecté pour envoyer données à l'api
    const authorizationToken = new HttpHeaders({
      Authorization: 'Bearer ' + token._token
    });

    const status_1 = this.http.put(
      `https://localhost:8000/api/publication_pictures/${pubPicture_2['id']}.json`,
      {
        "priority": pubPicture_1['priority']
      },
      { headers: authorizationToken }
    );

    const status_2 = this.http.put(
      `https://localhost:8000/api/publication_pictures/${pubPicture_1['id']}.json`,
      {
        "priority": priorityPubPicture_2
      },
      { headers: authorizationToken }
    );

    return forkJoin([status_1, status_2]);
  }
}
