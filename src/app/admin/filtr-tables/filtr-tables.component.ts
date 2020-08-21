import {Component, OnInit, ViewChild} from '@angular/core';
import {CenterOfIntreset, ProfileService} from '../../services/profile/profile.service';
import {Action, Need, PublicCible, Structure, Theme, Type} from '../../main/main-default/publication/publication.model';
import {NgForm} from '@angular/forms';
import {ProfileAdminService} from '../service/profile/profile-admin.service';
import {ProfessionObject} from '../../profile/my-info/my-info.component';
import {SousType} from '../../profile/my-profile/my-profile.component';

@Component({
  selector: 'app-filtr-tables',
  templateUrl: './filtr-tables.component.html',
  styleUrls: ['./filtr-tables.component.css']
})
export class FiltrTablesComponent implements OnInit {

  types: Type[];
  NumberOfType: number;
  arrType: any[];
  page = 1;

  actions: Action[];
  NumberOfAction: number;
  arrAction: any;
  page1 = 1;

  needs: Need[];
  NumberOfNeeds: number;
  arrNeed: any;
  page2 = 1;


  centerOfIntrest: CenterOfIntreset[];
  NumberOfCenterOfIntrest: number;
  arrCenterOfIntrest: any;
  page3 = 1;

  professions: ProfessionObject[];
  NumberOfProfessions: number;
  arrProfessions: any;
  page4 = 1;

  publicCible: PublicCible[];
  NumberOfPublic: number;
  arrPublic: any;
  page5 = 1;

  structures: Structure[];
  NumberOfStructure: number;
  arrStructure: any;
  page6 = 1;

  theme: Theme[];
  NumberOfTheme: number;
  arrTheme: any;
  page7 = 1;

  sousType: SousType[];
  NumberOfSousType: number;
  arrSousType: any;
  page8 = 1;


  isLoading = false;
  add = false;
  errors: any[] = [];
  error = false;


  @ViewChild('addTypeForm') addTypeForm: NgForm;
  @ViewChild('addActionForm') addActionForm: NgForm;
  @ViewChild('addNeedForm') addNeedForm: NgForm;
  @ViewChild('addCenterOfIntrestForm') addCenterOfIntrestForm: NgForm;
  @ViewChild('addProfessionForm') addProfessionForm: NgForm;
  @ViewChild('addPublicForm') addPublicForm: NgForm;
  @ViewChild('addStructureForm') addStructureForm: NgForm;
  @ViewChild('addThemeForm') addThemeForm: NgForm;
  @ViewChild('addSousTypeForm') addSousTypeForm: NgForm;


  constructor(private profileService: ProfileService, private profileAdminSer: ProfileAdminService) {
  }

  ngOnInit(): void {
    this.getType();
    this.getAction();
    this.getNeed();
    this.getCenterOfIntrest();
    this.getProfession();
    this.getPublicCible();
    this.getStructure();
    this.getTheme();
    this.getSousType();
  }

  errorMessage(message): void{
    this.errors.push(message);
    setTimeout(() => this.errors = [] , 4500);
  }
  /*type*/

  getType(): void {
    this.profileService.getTypes().subscribe(res => {
      this.types = res;
      this.arrType = [];
      for (const key in this.types) {
        if (this.types.hasOwnProperty(key)) {
          this.arrType.push(this.types[key].type);
        }
      }
      this.NumberOfType = this.types.length;
    });
  }

  onSubmit(): void {

    const newType = this.addTypeForm.value.type;
    if (this.arrType.includes(newType)) {
      this.errors.push('this item exist');
      this.errors = [];
    } else {
      this.profileAdminSer.addType(newType).subscribe(res => {
        this.getType();
        this.add = false;
      }, errors => console.log(errors));
    }
  }

  onDelete(id): void {
    this.profileAdminSer.deleteType(id).subscribe(res => {
      this.getType();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEdit(editTypeForm, id): void {
    const type = editTypeForm.value.type;
    this.profileAdminSer.editType(id, type).subscribe(res => {
      this.getType();
    }, errors => {
      console.log(errors);
    });
  }


  /*action*/


  getAction(): void {
    this.profileAdminSer.getActions().subscribe(res => {
      this.actions = res;
      this.arrAction = [];
      for (const key in this.actions) {
        if (this.actions.hasOwnProperty(key)) {
          this.arrAction.push(this.actions[key].actions);
        }
      }
      this.NumberOfAction = this.actions.length;
    });
  }

  onSubmitAction(): void {
    const newAction = this.addActionForm.value.action;
    if (this.arrAction.includes(newAction)) {
      this.errors.push('this item exist');
      this.errors = [];
    } else {
      this.profileAdminSer.addActions(newAction).subscribe(res => {
        this.getAction();
      }, errors => console.log(errors));
    }
  }

  onDeleteAction(id): void {
    this.profileAdminSer.deleteActions(id).subscribe(res => {
      this.getAction();
    }, errors =>  {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditAction(actionForm: NgForm, id): void {
    const action = actionForm.value.actions;
    this.profileAdminSer.editActions(id, action).subscribe(res => {
      this.getAction();
    }, errors => console.log(errors));
  }


  /*needs*/


  getNeed(): void {
    this.profileAdminSer.get('needs').subscribe(res => {
      this.needs = res;
      this.arrNeed = [];
      for (const key in this.needs) {
        if (this.needs.hasOwnProperty(key)) {
          this.arrNeed.push(this.needs[key].need);
        }
      }
      this.NumberOfNeeds = this.needs.length;
    });
  }

  onSubmitNeed(): void {
    const newNeed = this.addNeedForm.value.need;
    if (this.arrNeed.includes(newNeed)) {
      this.errors.push('this item exist');
      this.errors = [];
    } else {
      this.profileAdminSer.addNeed(newNeed).subscribe(res => {
        this.getNeed();
      }, errors => console.log(errors));
    }
  }

  onDeleteNeed(id): void {
    this.profileAdminSer.delete(id, 'needs').subscribe(res => {
      this.getNeed();
    }, errors =>  {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditNeed(needForm: NgForm, id): void {
    const need = needForm.value.need;
    this.profileAdminSer.editNeeds(id, need).subscribe(res => {
      this.getNeed();
    }, errors => console.log(errors));
  }


  /*CenterOfIntrest*/


  getCenterOfIntrest(): void {
    this.profileAdminSer.get('center_of_interests').subscribe(res => {
      this.centerOfIntrest = res;
      this.arrCenterOfIntrest = [];
      for (const key in this.centerOfIntrest) {
        if (this.centerOfIntrest.hasOwnProperty(key)) {
          this.arrCenterOfIntrest.push(this.centerOfIntrest[key].CenterOfInterest);
        }
      }
      this.NumberOfCenterOfIntrest = this.centerOfIntrest.length;
    });
  }

  onSubmitCenterOfIntrest(): void {
    const newCenterOfIntrest = this.addCenterOfIntrestForm.value.intrest;
    if (this.arrCenterOfIntrest.includes(newCenterOfIntrest)) {
      this.errors.push('this item exist');
      this.errors = [];
    } else {
      this.profileAdminSer.addCenterOfIntrest(newCenterOfIntrest).subscribe(res => {
        this.getCenterOfIntrest();
      }, errors => console.log(errors));
    }
  }

  onDeleteCenterOfIntrest(id): void {
    this.profileAdminSer.delete(id, 'center_of_interests').subscribe(res => {
      this.getCenterOfIntrest();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditCenterOfIntrest(CenterOfIntrestFormForm: NgForm, id): void {
    const CenterOfIntrest = CenterOfIntrestFormForm.value.CenterOfIntrestForm;
    this.profileAdminSer.editCenterOfIntrest(id, CenterOfIntrest).subscribe(res => {
      this.getNeed();
    }, errors => console.log(errors));
  }


  /*Profession*/

  getProfession(): void {
    this.profileAdminSer.get('professions').subscribe(res => {
      this.professions = res;
      this.arrProfessions = [];
      for (const key in this.professions) {
        if (this.professions.hasOwnProperty(key)) {
          this.arrProfessions.push(this.professions[key].profession);
        }
      }
      this.NumberOfProfessions = this.professions.length;
    });
  }

  onSubmitProfession(): void {
    const newProfessions = this.addProfessionForm.value.profession;
    if (this.arrProfessions.includes(newProfessions)) {
      this.errors.push('this item exist');
      this.errors = [];
    } else {
      this.profileAdminSer.addProfession(newProfessions).subscribe(res => {
        this.getProfession();
      }, errors => console.log(errors));
    }
  }

  onDeleteProfession(id): void {
    this.profileAdminSer.delete(id, 'professions').subscribe(res => {
      this.getProfession();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditProfession(professionForm: NgForm, id): void {
    const profession = professionForm.value.profession;
    this.profileAdminSer.editProfession(id, profession).subscribe(res => {
      this.getProfession();
    }, errors => console.log(errors));
  }




/* PublicCible */





  getPublicCible(): void{
    this.profileAdminSer.get('public_cibles').subscribe(res => {
      this.publicCible = res;
      this.arrPublic = [];
      for (const key in this.publicCible){
        if (this.publicCible.hasOwnProperty(key)) {
          this.arrPublic.push(this.publicCible[key].name);
        }
      }
      this.NumberOfPublic = this.publicCible.length;
    });
  }

  onSubmitPublicCible(): void{
    const newPublic = this.addPublicForm.value.public;
    if (this.arrPublic.includes(newPublic)){
      this.errors.push('this item exist');
      this.errors = [];
    }else{
      this.profileAdminSer.addPublic(newPublic).subscribe(res => {
        this.getPublicCible();
      }, errors => console.log(errors));
    }
  }

  onDeletePublicCible(id): void {
    this.profileAdminSer.delete(id, 'public_cibles').subscribe(res => {
      this.getPublicCible();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditPublicCible( publicForm: NgForm, id): void{
    const name = publicForm.value.public;
    this.profileAdminSer.editPublic(id, name).subscribe(res => {
      this.getPublicCible();
    }, errors => console.log(errors));
  }



  /* sousType*/


  getSousType(): void{
    this.profileAdminSer.get('sous_types').subscribe(res => {
      this.sousType = res;
      this.arrSousType = [];
      for (const key in this.sousType){
        if (this.sousType.hasOwnProperty(key)) {
          this.arrSousType.push(this.sousType[key].sousType);
        }
      }
      this.NumberOfSousType = this.sousType.length;
    });
  }

  onSubmitSousType(): void{
    const newSousType = this.addSousTypeForm.value.sousType;
    const type = '/api/types/' + this.addSousTypeForm.value.type;
    if (this.arrSousType.includes(newSousType)){
      this.errors.push('this item exist');
      this.errors = [];
    }else{
      this.profileAdminSer.addSousType(newSousType, type).subscribe(res => {
        this.getSousType();
      }, errors => console.log(errors));
    }
  }

  onDeleteSousType(id): void {
    this.profileAdminSer.delete(id, 'sous_types').subscribe(res => {
      this.getSousType();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditSousType( sousTypeForm: NgForm, id): void{
    const sousType = sousTypeForm.value.sousType;
    const type = '/api/types/' + sousTypeForm.value.type;

    this.profileAdminSer.editSousType(id, sousType, type).subscribe(res => {
      this.getSousType();
    }, errors => console.log(errors));
  }



  /*structure */

  getStructure(): void{
    this.profileAdminSer.get('structures').subscribe(res => {
      this.structures = res;
      this.arrStructure = [];
      for (const key in this.structures){
        if (this.structures.hasOwnProperty(key)) {
          this.arrStructure.push(this.structures[key].name);
        }
      }
      this.NumberOfStructure = this.structures.length;
    });
  }

  onSubmitStructure(): void{
    const newStructure = this.addStructureForm.value.structure;
    if (this.arrStructure.includes(newStructure)){
      this.errors.push('this item exist');
      this.errors = [];
    }else{
      this.profileAdminSer.addStructure(newStructure).subscribe(res => {
        this.getStructure();
      }, errors => console.log(errors));
    }
  }

  onDeleteStructure(id): void {
    this.profileAdminSer.delete(id, 'structures').subscribe(res => {
      this.getStructure();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditStructure( structureForm: NgForm, id): void{
    const structure = structureForm.value.structure;
    this.profileAdminSer.editStructure(id, structure).subscribe(res => {
      this.getStructure();
    }, errors => console.log(errors));
  }




  /*theme*/




  getTheme(): void{
    this.profileAdminSer.get('themes').subscribe(res => {
      this.theme = res;
      this.arrTheme = [];
      for (const key in this.theme){
        if (this.theme.hasOwnProperty(key)) {
          this.arrTheme.push(this.theme[key].theme);
        }
      }
      this.NumberOfTheme = this.theme.length;
    });
  }

  onSubmitTheme(): void{
    const newTheme = this.addThemeForm.value.theme;
    if (this.arrTheme.includes(newTheme)){
      this.errors.push('this item exist');
      this.errors = [];
    }else{
      this.profileAdminSer.addtheme(newTheme).subscribe(res => {
        this.getTheme();
      }, errors => console.log(errors));
    }
  }

  onDeleteTheme(id): void {
    this.profileAdminSer.delete(id, 'themes').subscribe(res => {
      this.getTheme();
    }, errors => {
      this.errorMessage('Désolé, vous ne pouvez pas supprimer cet élément, car des comptes utilisent cet élément.')
    });
  }

  onEditTheme( themeForm: NgForm, id): void{
    const theme = themeForm.value.theme;
    this.profileAdminSer.edittheme(id, theme).subscribe(res => {
      this.getTheme();
    }, errors => console.log(errors));
  }
}
