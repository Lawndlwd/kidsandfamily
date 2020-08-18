import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Publication} from '../../../main/main-default/publication/publication.model';
import {PubService} from '../../service/pub/pub.service';
import {MdbTableDirective} from 'angular-bootstrap-md';
@Component({
  selector: 'app-show-pubs',
  templateUrl: './show-pubs.component.html',
  styleUrls: ['./show-pubs.component.css']
})
export class ShowPubsComponent implements OnInit, AfterViewInit {
   @ViewChild( MdbTableDirective , {static: true}) mdbTable: MdbTableDirective ;

  pubs: Publication[] ;
  NumberOfPub: number;
  page = 1;
  searchText = '';
  previous: string;



  constructor(private pubsService: PubService, private cdRef: ChangeDetectorRef) { }


  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    console.log(this.mdbTable);
    this.pubsService.getListOfPubs().subscribe(resData => {
      console.log(resData);
      this.pubs = resData;
      this.NumberOfPub = this.pubs.length;

    }, error => console.log(error));


  }

  ngAfterViewInit(): void {
    console.log(this.mdbTable); // correctly outputs the element in console, not undefined
    this.mdbTable.setDataSource(this.pubs);
    this.previous = this.mdbTable.getDataSource();
  }

  searchItems(): void {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.pubs = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.pubs = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

}
