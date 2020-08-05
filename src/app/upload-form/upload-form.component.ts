import { Component, OnInit } from '@angular/core';
import { UploadService } from './../services/upload/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFiles: string[];
  publication: string = '7';
  token = JSON.parse(localStorage.getItem('userToken'));

  constructor(private upload: UploadService) { }

  ngOnInit(): void {
  }

  onSelected(event) {
    this.selectedFiles = event.target.files;
  }

  onUpload() {
    const formData = new FormData();
    for(let file of this.selectedFiles) {
      formData.append('file', file);
      formData.append('publication', this.publication);

      this.upload.publicationPicture(formData, this.token)
        .subscribe(response => {
          console.log(response); 
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
