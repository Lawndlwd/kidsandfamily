import { Component, OnInit } from '@angular/core';
import { UploadService } from './../services/upload/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFile;
  publication: string;
  token = JSON.parse(localStorage.getItem('userToken'));

  constructor(private upload: UploadService) { }

  ngOnInit(): void {
  }

  onSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    
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
