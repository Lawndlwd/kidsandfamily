import { Component, OnInit } from '@angular/core';

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
  profils: string[];
  publics: string[];
  themes: string[];
  actions: string[];
  structures: string[];
  departements: string[];

  constructor() {
    this.profils = this.getProfils();
    this.publics = this.getPublics();
    this.themes = this.getThemes();
    this.actions = this.getActions();
    this.structures = this.getStructures();
    this.departements = this.getDepartements();
  }

  ngOnInit(): void {
  }

  getProfils() {
    return ['Particulier', 'professionnel'];
  }

  getPublics() {
    return ['Enfants', 'Ados', 'Adultes'];
  }

  getThemes() {
    return ['Loisir', 'Environnement', 'Autre'];
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
