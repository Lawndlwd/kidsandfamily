import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [`
    #accordion {
      font-size: 13px;
    }
  `]
})
export class FiltersComponent implements OnInit {
  profils;
  publics;
  themes;
  actions: string[];
  structures: string[];
  departements: string[];

  constructor(private filtersService: FiltersService) {
    this.actions = this.getActions();
    this.structures = this.getStructures();
    this.departements = this.getDepartements();
  }

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
  }

  getActions() {
    return ['Je propose mon aide', 'J\'ai besoin d\'aide'];
  }

  getStructures() {
    return ['Ludothèque', 'Médiathèque', 'Autre'];
  }

  getDepartements() {
    return ['Loiret', 'Indres-et-Loire'];
  }
}

interface Type {
  id: number,
  type: string
}
