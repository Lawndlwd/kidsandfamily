import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private _url = 'https://localhost:8000/api/publications/';
  private _urlHome = 'https://localhost:8000/api/home_images';
  private _jsonFormat = '.json';
  private _pubPicturesAPIPropertyFilter = '?properties[publicationPictures][]=filePath&properties[publicationPictures][]=id&properties[publicationPictures][]=priority';
  token = JSON.parse(localStorage.getItem('userToken'));

  constructor(private http: HttpClient) { }

  getPublicationPictures(publicationId, token) {
    return this.http.get(this._url + publicationId + this._jsonFormat + this._pubPicturesAPIPropertyFilter);
  }

  getHomeImages() {
    return this.http.get(this._urlHome + this._jsonFormat);
  }

  createHomeImages(formData: FormData) {
    return this.http.post(this._urlHome + this._jsonFormat,
      formData
     , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token._token
      })
    });
  }

  deleteHomeImages(id) {
    return this.http.delete(this._urlHome + '/' + id + '.json', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token._token
        })
      });
  }
}
