import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private _url = 'https://localhost:8000/api/publications/';
  private _jsonFormat = '.json';
  private _pubPicturesAPIPropertyFilter = '?properties[]=publicationPictures';

  constructor(private http: HttpClient) { }

  getPublicationPictures(publicationId, token) {
    // return this.http.get(this._url + publicationId + this._jsonFormat + this._pubPicturesAPIPropertyFilter);
    return this.http.get('https://localhost:8000/api/publications/7.json?properties[publicationPictures][]=filePath');
  }
}
