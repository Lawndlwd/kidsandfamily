import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Publication} from '../../../main/main-default/publication/publication.model';
import {PubService} from '../../service/pub/pub.service';
@Component({
  selector: 'app-show-pubs',
  templateUrl: './show-pubs.component.html',
  styleUrls: ['./show-pubs.component.css']
})
export class ShowPubsComponent implements OnInit {

  pubs: Publication[] ;
  NumberOfPub: number;
  page = 1;


  constructor(private pubsService: PubService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pubsService.getListOfPubs().subscribe(resData => {
      console.log(resData);
      this.pubs = resData;
      this.NumberOfPub = this.pubs.length;

    }, error => console.log(error));


  }

}
