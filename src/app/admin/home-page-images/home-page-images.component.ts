import { Component, OnInit } from '@angular/core';
import {DownloadService} from '../../services/download/download.service';

@Component({
  selector: 'app-home-page-images',
  templateUrl: './home-page-images.component.html',
  styleUrls: ['./home-page-images.component.css']
})
export class HomePageImagesComponent implements OnInit {
  imgPaths: any[];
  // upload
  selectedFiles: string[] = [];
  publicationId = '28';
  token = JSON.parse(localStorage.getItem('userToken'));

  // upload errors
  errorMessages = {
    sizeError: null,
    typeError: null
  };
  notUploadedSizeError: string[] = [];
  notUploadedTypeError: string[] = [];
  isError = true;
  img: number;

  constructor(private download: DownloadService) { }

  ngOnInit(): void {

    'use strict';

    (function(document, window, index) {
      let inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function(input) {
        // tslint:disable-next-line:one-variable-per-declaration
        let label = input.nextElementSibling,
          labelVal = label.innerHTML;

        input.addEventListener('change', function(e) {
          let fileName = '';
          if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
          }
          else {
            fileName = e.target.value.split('\\').pop();
          }

          if (fileName) {
            label.querySelector('span').innerHTML = fileName;
          }
          else {
            label.innerHTML = labelVal;
          }
        });

        // Firefox bug fix
        input.addEventListener('focus', function() {
          input.classList.add('has-focus');
        });
        input.addEventListener('blur', function() {
          input.classList.remove('has-focus');
        });
      });
    }(document, window, 0));

    this.download.getHomeImages().subscribe(res => {
      const paths: object[] = [];
      // tslint:disable-next-line:forin
      for (const i in res) {
        if (res.hasOwnProperty(i)) {
          paths.push(res[i]);
        }
        this.imgPaths = paths;
      }
    }, error => console.log(error));
  }


  onSelected(event): void{
    const acceptedTypes: string[] = ['image/jpeg', 'image/png'];
    const maxSize = 2000000;
    const errorSize = 'La taille maximale autorisée d\'une image est 2Mo';
    const errorType = 'Les extensions autorisées : "jpeg", ".png"';
    this.errorMessages.sizeError = null;
    this.errorMessages.typeError = null;
    this.notUploadedSizeError = [];
    this.notUploadedTypeError = [];
    this.isError = false;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].size > maxSize) {
        if (this.errorMessages.sizeError === null) {
          this.errorMessages.sizeError = errorSize;
        }
        this.notUploadedSizeError.push(event.target.files[i].name);
      } else {
        if (!acceptedTypes.includes(event.target.files[i].type)) {
          if (this.errorMessages.typeError === null) {
            this.errorMessages.typeError = errorType;
          }
          this.notUploadedTypeError.push(event.target.files[i].name);
        } else {
          this.selectedFiles.push(event.target.files[i]);
        }
      }
    }
    if (this.errorMessages.sizeError != null || this.errorMessages.typeError != null) {
      this.isError = true;
    }else {
      this.isError = false;
    }
  }

  onUpload(): void{
    if (this.errorMessages.sizeError != null || this.errorMessages.typeError != null) {
      this.isError = true;
    }

    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('file', file);
      this.download.createHomeImages(formData)
        .subscribe(response => {
            this.ngOnInit();
          }, error => {
            console.log(error);
          }
        );
    }
    this.selectedFiles = [];
  }

  onDelete(event): void{
    this.img = event.target.value;
    this.download.deleteHomeImages(this.img)
      .subscribe(response => {
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      );
  }

}
