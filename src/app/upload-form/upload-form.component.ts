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
  selectedFiles: string[] = [];
  publicationId: string = '7';
  token = JSON.parse(localStorage.getItem('userToken'));

  // upload errors
  errorMessages = { 
    sizeError: null
  };
  notUploadedPicturesName: string[] = [];
  isError = false;

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
    const maxSize = 2000000;
    const errorSize = "La taille maximale autorisée d'une image est 2Mo";

    this.errorMessages['sizeError'] = null;
    this.notUploadedPicturesName = [];
    this.isError = false;
    
    for(let i=0; i < event.target.files.length; i++) {
      if (event.target.files[i].size > maxSize) {
        if (this.errorMessages['sizeError'] === null) {
          this.errorMessages['sizeError'] = errorSize;
        }
        this.notUploadedPicturesName.push(event.target.files[i].name);
      } else {
        this.selectedFiles.push(event.target.files[i]);
      }
    }
  }

  onUpload() {
    if(this.errorMessages['sizeError'] != null) {
      this.isError = true;
    }

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
      this.selectedFiles = [];
  }

  onDelete(event) {
    this.publicationPictureId = event.target.value;
    this.upload.deletePublicationPicture(this.publicationPictureId, this.token)
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
    
    this.upload.inversePriority(this.publicationPictures[indexPubPictureSelected], this.publicationPictures[+indexPubPictureSelected - 1], this.token)
      .subscribe(response => {
        // console.log(response);
        this.ngOnInit();
      }, error => {
        console.log(error);
      })
  }

  toLower(event) {
    const indexPubPictureSelected = event.target.value;
    
    this.upload.inversePriority(this.publicationPictures[indexPubPictureSelected], this.publicationPictures[+indexPubPictureSelected + 1], this.token)
      .subscribe(response => {
        // console.log(response);
        this.ngOnInit();
      }, error => {
        console.log(error);
      })
  }
}
