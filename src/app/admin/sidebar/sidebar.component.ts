import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  constructor(private back: Location)
  {}

  backClicked(): void {
    this.back.back();
  }

  ngOnInit(): void {
    $('#sidebarToggle, #sidebarToggleTop').on('click', (e => {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    }));

  }



}
