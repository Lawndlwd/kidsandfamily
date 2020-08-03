
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivationComponent } from './activation/activation.component';
import { RegisterComponent } from './auth/register/register.component';
import { PublicationDetailsComponent } from './main/main-default/publication-details/publication-details.component';
import { MainFiltreSelectionComponent } from './main/main-filtre-selection/main-filtre-selection.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ActivationTokenComponent } from './activation-token/activation-token.component';
import { MainComponent } from './main/main.component';
import { MainDefaultComponent } from './main/main-default/main-default.component';
import {ProfileComponent} from './profile/profile.component';
import {MyInfoComponent} from './profile/my-info/my-info.component';
import {MyProfileComponent} from './profile/my-profile/my-profile.component';
import {ShowMyProfilenComponent} from './profile/show-my-profilen/show-my-profilen.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';



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
    { path: 'mon-compte', component: ProfileComponent, canActivate: [AuthGuard], children:
        [
          { path: '', component: MyInfoComponent, canActivate: [AuthGuard]},
          { path: 'profile', component: MyProfileComponent},
          { path: 'profiles', component: ShowMyProfilenComponent},
          { path: 'edit-profile', component: EditProfileComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
