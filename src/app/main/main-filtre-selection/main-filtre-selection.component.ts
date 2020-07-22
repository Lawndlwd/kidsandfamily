import { Component, OnInit, Input, Output } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-main-filtre-selection',
  templateUrl: './main-filtre-selection.component.html',
  styleUrls: ['./main-filtre-selection.component.css'],
  
})


export class MainFiltreSelectionComponent implements OnInit {
 
  showL=false;
  showC=true;


   @Output() ShowList(){
    this.showL=false;
    this.showC=true;
  }
 
  @Output() ShowCard(){
    
    this.showC=false;
    this.showL=true;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
