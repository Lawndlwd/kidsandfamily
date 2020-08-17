import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UploadService } from './../services/upload/upload.service';
import { DownloadService } from '../services/download/download.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  // download
  publicationPictures;

  // upload
  selectedFiles: string[];
  publicationId: string = '7';
  token = JSON.parse(localStorage.getItem('userToken'));

  // delete
  publicationPictureId: string = '31';

  constructor(private upload: UploadService, private download: DownloadService) { }

  ngOnInit(): void {
    this.download.getPublicationPictures(this.publicationId, this.token)
      .subscribe(response => {
        // console.log(response);

        this.publicationPictures = response['publicationPictures'].sort((a,b) => a.priority - b.priority);
      }, error => {
        console.log(error);
      });
  }

  onSelected(event) {
    this.selectedFiles = event.target.files;
  }

  onUpload() {
    const formData = new FormData();
    for(let file of this.selectedFiles) {
      formData.append('file', file);
      formData.append('publication', this.publicationId);

      this.upload.publicationPicture(formData, this.token)
        .subscribe(response => {
          // console.log(response);
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onDelete(event) {
    this.publicationPictureId = event.target.value;
    this.upload.deletePublicationPicture(this.publicationPictureId)
      .subscribe(response => {
        // console.log(response);
        this.ngOnInit();
      }, error => {
        console.log(error);
      }
    );
  }

  toUpper(event) {
    const indexPubPictureSelected = event.target.value;
    
    this.upload.inversePriority(this.publicationPictures[indexPubPictureSelected], this.publicationPictures[+indexPubPictureSelected - 1])
      .subscribe(response => {
        // console.log(response);
        this.ngOnInit();
      }, error => {
        console.log(error);
      })
  }

  toLower(event) {
    const indexPubPictureSelected = event.target.value;
    
    this.upload.inversePriority(this.publicationPictures[indexPubPictureSelected], this.publicationPictures[+indexPubPictureSelected + 1])
      .subscribe(response => {
        // console.log(response);
        this.ngOnInit();
      }, error => {
        console.log(error);
      })
  }
}