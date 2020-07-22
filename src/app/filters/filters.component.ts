import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  profils;
  publics;
  themes;
  actions;
  structures;
  regions;

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    // initialisation profils
    this.filtersService.getTypes()
      .subscribe(response => {
        this.profils = response;
      });

    // initialisation publics_cibles
    this.filtersService.getPublics()
    .subscribe(response => {
      this.publics = response;
    });

    // initialisation thèmes
    this.filtersService.getThemes()
    .subscribe(response => {
      this.themes = response;
    });

    // initialisation actions
    this.filtersService.getActions()
      .subscribe(response => {
        this.actions = response;
      });

    // initialisation structures
    this.filtersService.getStructures()
      .subscribe(response => {
        this.structures = response;
      });

    // initialisation régions
    this.regions = this.filtersService.getRegions();
  }
}
