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
  profils: Type[] = [];
  publics: string[];
  themes: string[];
  actions: string[];
  structures: string[];
  departements: string[];

  constructor(private filtersService: FiltersService) {
    this.publics = this.getPublics();
    this.themes = this.getThemes();
    this.actions = this.getActions();
    this.structures = this.getStructures();
    this.departements = this.getDepartements();
  }

  ngOnInit(): void {
    // initialisation profils
    this.filtersService.getTypes()
      .subscribe(response => {
        for (let index in response) {
          let type: Type = {
            id: response[index].id,
            type: response[index]['type']
          };

          this.profils.push(type);
        }
      });
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

interface Type {
  id: number,
  type: string
}