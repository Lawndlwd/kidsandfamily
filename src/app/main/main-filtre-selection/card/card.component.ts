import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // @Output() showL=false;
  // @Output() showC=true;

  // @Output() ShowCard(){
  //   this.showC=false;
  //   this.showL=true;
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
