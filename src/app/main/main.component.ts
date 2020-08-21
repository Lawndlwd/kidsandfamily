import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DownloadService} from '../services/download/download.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  home = false;
  imgPaths: any[];
  constructor(private router: Router, private  route: ActivatedRoute, private  download: DownloadService) {
  }

  ngOnInit(): void {
    if (location.pathname === '/'){
      this.home = true;
    }

    this.router.events.subscribe(value => {
      this.home = location.pathname === '/';
      }
    );
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
}
