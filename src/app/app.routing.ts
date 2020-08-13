
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
import {CenterOfInterestComponent} from './profile/center-of-interest/center-of-interest.component';
import {SecurityComponent} from './profile/security/security.component';
import {AdminComponent} from './admin/admin.component';
import {DashoardComponent} from './admin/dashoard/dashoard.component';
import {UsersComponent} from './admin/users/users.component';
import {PubsComponent} from './admin/pubs/pubs.component';
import {ProfilesComponent} from './admin/profiles/profiles.component';
import {ShowUsersComponent} from './admin/users/show-users/show-users.component';
import {ShowPubsComponent} from './admin/pubs/show-pubs/show-pubs.component';
import {ShowProfilesComponent} from './admin/profiles/show-profiles/show-profiles.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CreateUserComponent} from './admin/users/create-user/create-user.component';
import {EditUserComponent} from './admin/users/edit-user/edit-user.component';
import {AdminEditProfileComponent} from './admin/profiles/admin-edit-profile/admin-edit-profile.component';
import {CreatePubComponent} from './admin/pubs/create-pub/create-pub.component';



// , canActivate: [AuthGuard]
const appRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: MainDefaultComponent },
      { path: 'publications-filter', component: MainFiltreSelectionComponent },
      { path: 'publications-details/:id', component: PublicationDetailsComponent }
    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'activateAccount', component: ActivationComponent},
  { path: ':id/activateaccount/:token', component: ActivationTokenComponent},
  {
    path: 'mon-compte', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: MyInfoComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: MyProfileComponent},
      { path: 'profiles', component: ShowMyProfilenComponent},
      { path: 'edit-profile/:id', component: EditProfileComponent},
      { path: 'center-of-interest', component: CenterOfInterestComponent},
      { path: 'security-setting', component: SecurityComponent},
    ]
  },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: DashoardComponent},
      { path: 'users', component: UsersComponent,
        children: [
          { path: '', component: ShowUsersComponent},
          { path: 'create-user', component: CreateUserComponent},
          { path: ':id/edit', component: EditUserComponent},
        ]},
      { path: 'publications', component: PubsComponent,
        children: [
          { path: '', component: ShowPubsComponent},
          { path: 'create-pub', component: CreatePubComponent},
        ]},
      { path: 'profile', component: ProfilesComponent,
        children: [
          { path: '', component: ShowProfilesComponent},
          { path: ':id/edit', component: AdminEditProfileComponent}
        ]},
      // { path: 'center-of-interest', component: CenterOfInterestComponent},
      // { path: 'security-setting', component: SecurityComponent},
    ]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouting {

}
