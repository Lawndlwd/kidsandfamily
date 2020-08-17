import {Component, OnInit, ViewChild} from '@angular/core';
import {CenterOfIntreset, ProfileService} from '../../services/profile/profile.service';
import {Action, Need, Type} from '../../main/main-default/publication/publication.model';
import {NgForm} from '@angular/forms';
import {ProfileAdminService} from '../service/profile/profile-admin.service';
import {ProfessionObject} from '../../profile/my-info/my-info.component';
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

  isLoading = false;
  add = false;
  error: any[] = [];


  @ViewChild('addTypeForm') addTypeForm: NgForm;
  @ViewChild('addActionForm') addActionForm: NgForm;
  @ViewChild('addNeedForm') addNeedForm: NgForm;
  @ViewChild('addCenterOfIntrestForm') addCenterOfIntrestForm: NgForm;
  @ViewChild('addProfessionForm') addProfessionForm: NgForm;

  constructor(private profileService: ProfileService, private profileAdminSer: ProfileAdminService) {
  }

  ngOnInit(): void {
    this.getType();
    this.getAction();
    this.getNeed();
    this.getCenterOfIntrest();
    this.getProfession();

  }

  /*type*/

  getType(): void {
    this.profileService.getTypes().subscribe(res => {
      console.log(res);
      this.types = res;
      this.arrType = [];
      for (const key in this.types) {
        if (this.types.hasOwnProperty(key)) {
          this.arrType.push(this.types[key].type);
        }
      }
      console.log(this.arrType);
      this.NumberOfType = this.types.length;
    });
  }

  onSubmit(): void {

    const newType = this.addTypeForm.value.type;
    if (this.arrType.includes(newType)) {
      this.error.push('this item exist');
      console.log(this.error);
      this.error = [];
    } else {
      this.profileAdminSer.addType(newType).subscribe(res => {
        console.log(res);
        this.getType();
        this.add = false;
      }, error => console.log(error));
    }
  }

  onDelete(id): void {
    this.profileAdminSer.deleteType(id).subscribe(res => {
      console.log(res);
      this.getType();
    }, error => console.log(error));
  }

  onEdit(editTypeForm, id): void {
    const type = editTypeForm.value.type;
    this.profileAdminSer.editType(id, type).subscribe(res => {
      console.log(res);
      this.getType();
    }, error => console.log(error));
  }


  /*action*/


  getAction(): void {
    this.profileAdminSer.getActions().subscribe(res => {
      console.log(res);
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
      this.error.push('this item exist');
      this.error = [];
    } else {
      this.profileAdminSer.addActions(newAction).subscribe(res => {
        console.log(res);
        this.getAction();
      }, error => console.log(error));
    }
  }

  onDeleteAction(id): void {
    this.profileAdminSer.deleteActions(id).subscribe(res => {
      console.log(res);
      this.getAction();
    }, error => console.log(error));
  }

  onEditAction(actionForm: NgForm, id): void {
    const action = actionForm.value.actions;
    console.log(action);
    this.profileAdminSer.editActions(id, action).subscribe(res => {
      console.log(res);
      this.getAction();
    }, error => console.log(error));
  }


  /*needs*/


  getNeed(): void {
    this.profileAdminSer.get('needs').subscribe(res => {
      console.log(res);
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
      this.error.push('this item exist');
      this.error = [];
    } else {
      this.profileAdminSer.addNeed(newNeed).subscribe(res => {
        console.log(res);
        this.getNeed();
      }, error => console.log(error));
    }
  }

  onDeleteNeed(id): void {
    this.profileAdminSer.delete(id, 'needs').subscribe(res => {
      console.log(res);
      this.getNeed();
    }, error => console.log(error));
  }

  onEditNeed(needForm: NgForm, id): void {
    const need = needForm.value.need;
    console.log(need);
    this.profileAdminSer.editNeeds(id, need).subscribe(res => {
      console.log(res);
      this.getNeed();
    }, error => console.log(error));
  }


  /*CenterOfIntrest*/


  getCenterOfIntrest(): void {
    this.profileAdminSer.get('center_of_interests').subscribe(res => {
      console.log(res);
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
    console.log(newCenterOfIntrest);
    if (this.arrCenterOfIntrest.includes(newCenterOfIntrest)) {
      this.error.push('this item exist');
      this.error = [];
    } else {
      this.profileAdminSer.addCenterOfIntrest(newCenterOfIntrest).subscribe(res => {
        console.log(res);
        this.getCenterOfIntrest();
      }, error => console.log(error));
    }
  }

  onDeleteCenterOfIntrest(id): void {
    this.profileAdminSer.delete(id, 'center_of_interests').subscribe(res => {
      console.log(res);
      this.getCenterOfIntrest();
    }, error => console.log(error));
  }

  onEditCenterOfIntrest(CenterOfIntrestFormForm: NgForm, id): void {
    const CenterOfIntrest = CenterOfIntrestFormForm.value.CenterOfIntrestForm;
    console.log(CenterOfIntrest);
    this.profileAdminSer.editCenterOfIntrest(id, CenterOfIntrest).subscribe(res => {
      console.log(res);
      this.getNeed();
    }, error => console.log(error));
  }


  /*Profession*/

  getProfession(): void {
    this.profileAdminSer.get('professions').subscribe(res => {
      console.log(res);
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
      this.error.push('this item exist');
      this.error = [];
    } else {
      this.profileAdminSer.addProfession(newProfessions).subscribe(res => {
        console.log(res);
        this.getProfession();
      }, error => console.log(error));
    }
  }

  onDeleteProfession(id): void {
    this.profileAdminSer.delete(id, 'professions').subscribe(res => {
      console.log(res);
      this.getProfession();
    }, error => console.log(error));
  }

  onEditProfession(professionForm: NgForm, id): void {
    const profession = professionForm.value.profession;
    console.log(profession);
    this.profileAdminSer.editProfession(id, profession).subscribe(res => {
      console.log(res);
      this.getProfession();
    }, error => console.log(error));
  }


//
//
// /* PublicCible */
//
//
//
//
//
//   getPublicCible(): void{
//     this.profileAdminSer.get('public_cibles').subscribe(res => {
//       console.log(res);
//       this.needs = res;
//       this.arrNeed = [];
//       for (const key in this.needs){
//         if (this.needs.hasOwnProperty(key)) {
//           this.arrNeed.push(this.needs[key].need);
//         }
//       }
//       this.NumberOfNeeds = this.needs.length;
//     });
//   }
//
//   onSubmitPublicCible(): void{
//     const newNeed = this.addNeedForm.value.need;
//     if (this.arrNeed.includes(newNeed)){
//       this.error.push('this item exist');
//       this.error = [];
//     }else{
//       this.profileAdminSer.addNeeds(newNeed).subscribe(res => {
//         console.log(res);
//         this.getNeed();
//       }, error => console.log(error));
//     }
//   }
//
//   onDeletePublicCible(id): void {
//     this.profileAdminSer.deleteNeeds(id).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//   onEditPublicCible( needForm: NgForm, id): void{
//     const need = needForm.value.need;
//     console.log(need);
//     this.profileAdminSer.editNeeds(id, need).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//
//
//   /* sousType*/
//
//
//   getSousType(): void{
//     this.profileAdminSer.get('sous_types').subscribe(res => {
//       console.log(res);
//       this.needs = res;
//       this.arrNeed = [];
//       for (const key in this.needs){
//         if (this.needs.hasOwnProperty(key)) {
//           this.arrNeed.push(this.needs[key].need);
//         }
//       }
//       this.NumberOfNeeds = this.needs.length;
//     });
//   }
//
//   onSubmitSousType(): void{
//     const newNeed = this.addNeedForm.value.need;
//     if (this.arrNeed.includes(newNeed)){
//       this.error.push('this item exist');
//       this.error = [];
//     }else{
//       this.profileAdminSer.addNeeds(newNeed).subscribe(res => {
//         console.log(res);
//         this.getNeed();
//       }, error => console.log(error));
//     }
//   }
//
//   onDeleteSousType(id): void {
//     this.profileAdminSer.deleteNeeds(id).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//   onEditSousType( needForm: NgForm, id): void{
//     const need = needForm.value.need;
//     console.log(need);
//     this.profileAdminSer.editNeeds(id, need).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//
//
//   /*structure */
//
//   getStructure(): void{
//     this.profileAdminSer.get('structures').subscribe(res => {
//       console.log(res);
//       this.needs = res;
//       this.arrNeed = [];
//       for (const key in this.needs){
//         if (this.needs.hasOwnProperty(key)) {
//           this.arrNeed.push(this.needs[key].need);
//         }
//       }
//       this.NumberOfNeeds = this.needs.length;
//     });
//   }
//
//   onSubmitStructure(): void{
//     const newNeed = this.addNeedForm.value.need;
//     if (this.arrNeed.includes(newNeed)){
//       this.error.push('this item exist');
//       this.error = [];
//     }else{
//       this.profileAdminSer.addNeeds(newNeed).subscribe(res => {
//         console.log(res);
//         this.getNeed();
//       }, error => console.log(error));
//     }
//   }
//
//   onDeleteStructure(id): void {
//     this.profileAdminSer.deleteNeeds(id).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//   onEditStructure( needForm: NgForm, id): void{
//     const need = needForm.value.need;
//     console.log(need);
//     this.profileAdminSer.editNeeds(id, need).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//
//
//
//   /*theme*/
//
//
//
//
//   getTheme(): void{
//     this.profileAdminSer.get('themes').subscribe(res => {
//       console.log(res);
//       this.needs = res;
//       this.arrNeed = [];
//       for (const key in this.needs){
//         if (this.needs.hasOwnProperty(key)) {
//           this.arrNeed.push(this.needs[key].need);
//         }
//       }
//       this.NumberOfNeeds = this.needs.length;
//     });
//   }
//
//   onSubmitTheme(): void{
//     const newNeed = this.addNeedForm.value.need;
//     if (this.arrNeed.includes(newNeed)){
//       this.error.push('this item exist');
//       this.error = [];
//     }else{
//       this.profileAdminSer.addNeeds(newNeed).subscribe(res => {
//         console.log(res);
//         this.getNeed();
//       }, error => console.log(error));
//     }
//   }
//
//   onDeleteTheme(id): void {
//     this.profileAdminSer.deleteNeeds(id).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//   onEditTheme( needForm: NgForm, id): void{
//     const need = needForm.value.need;
//     console.log(need);
//     this.profileAdminSer.editNeeds(id, need).subscribe(res => {
//       console.log(res);
//       this.getNeed();
//     }, error => console.log(error));
//   }
//
//
//
// }
}
