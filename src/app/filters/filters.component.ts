import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../services/filters/filters.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {Router} from "@angular/router"

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  // champs du panneau filtre
  profils;
  publics;
  themes;
  actions;
  structures;
  regions;

  // tableau des champs sélectionnés
  selectFilters = {
    profil: [],
    public: [],
    theme: [],
    action: [],
    structure: [],
    region: []
  };

  // compteur de champs sélectionnés, si != 0 redirection composant main-filtre-selection
  compteur: number = 0;

  constructor(private filtersService: FiltersService, private router: Router) {}

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

  onCheckboxChange(e) {
    if (e.target.checked) {
      /*
      * ajout du filtre pour dans le tableau des filtres sélectionnés
      * e.target.value correspond au groupe du filtre sélectionné (ex : profil)
      * e.target.id.split(".")[1] correspond au filtre sélectionné (ex : particulier)
      */
      this.selectFilters[e.target.value].push(e.target.id.split(".")[1]);

      this.compteur++;

      console.log(this.selectFilters);
    } else {
      // retrait du filtre unchecked du tableau des filtres sélectionnés
      this.selectFilters[e.target.value].splice(this.selectFilters[e.target.value].indexOf(e.target.id.split(".")[1]));
      
      this.compteur--;

      console.log(this.selectFilters);
    }

    if (this.compteur != 0) {
      this.router.navigate(['/publications-filter']);
    } else {
      this.router.navigate(['/publications']);
    }
  }
}
