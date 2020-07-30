
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivationComponent } from './activation/activation.component';
import { RegisterComponent } from './auth/register/register.component';
import { PublicationDetailsComponent } from './main/main-default/publication-details/publication-details.component';
import { MainFiltreSelectionComponent } from './main/main-filtre-selection/main-filtre-selection.component';
import { AuthGuard } from './auth/auth.guard';
import { PublicationComponent } from './main/main-default/publication/publication.component';
import { AuthComponent } from './auth/auth.component';
import { ActivationTokenComponent } from './activation-token/activation-token.component';
import { MainComponent } from './main/main.component';
import { MainDefaultComponent } from './main/main-default/main-default.component';

// , canActivate: [AuthGuard] 
const appRoutes: Routes = [
    { 
      path: '', component: MainComponent,
      children: [
        { path: 'publications', component: MainDefaultComponent },
        { path: 'publications-filter', component: MainFiltreSelectionComponent },
        { path: 'publications-details/:id', component: PublicationDetailsComponent }
      ] 
    },
    { path: 'auth', component: AuthComponent },
    { path: 'inscription', component: RegisterComponent },
    { path: 'activateAccount', component: ActivationComponent},
    { path: ':id/activateaccount/:token', component: ActivationTokenComponent},
    // { path: 'publications', component: MainDefaultComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}