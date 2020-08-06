import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  home = false;
  constructor(private router: Router, private  route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (location.pathname === '/'){
      this.home = true;
    }

    this.router.events.subscribe(value => {
      if (location.pathname === '/') {
      this.home = true;
      }else {
        this.home = false;
      }
      }
    );
    console.log(location.pathname);
  }
}
