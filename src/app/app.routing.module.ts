import { RegisterComponent } from './auth/register/register.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PublicationDetailsComponent } from './main/main-default/publication-details/publication-details.component';
import { MainFiltreSelectionComponent } from './main/main-filtre-selection/main-filtre-selection.component';
import { AuthGuard } from './auth/auth.guard';
import { PublicationComponent } from './main/main-default/publication/publication.component';
import { AuthComponent } from './auth/auth.component';




const appRoutes: Routes = [
    { path: '', component: PublicationComponent },
    { path: 'publications-details/:id', component: PublicationDetailsComponent , canActivate: [AuthGuard] },
    { path: 'publications-filter', component: MainFiltreSelectionComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'inscription', component: RegisterComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}