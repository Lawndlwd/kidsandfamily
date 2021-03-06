// Modules
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';
import {MDBBootstrapModule, MdbTableDirective} from 'angular-bootstrap-md';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// Components
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { PublicationDetailsComponent } from './main/main-default/publication-details/publication-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainFiltreSelectionComponent } from './main/main-filtre-selection/main-filtre-selection.component';
import { ListComponent } from './main/main-filtre-selection/list/list.component';
import { CardComponent } from './main/main-filtre-selection/card/card.component';
import { FiltersComponent } from './filters/filters.component';
import { MainComponent } from './main/main.component';
import { MainDefaultComponent } from './main/main-default/main-default.component';
import { PublicationComponent } from './main/main-default/publication/publication.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { ActivationComponent } from './activation/activation.component';
import { ActivationTokenComponent } from './activation-token/activation-token.component';
import { ProfileComponent } from './profile/profile.component';
import { MyInfoComponent } from './profile/my-info/my-info.component';
import { ProfileFilterComponent } from './profile/profile-filter/profile-filter.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ShowMyProfilenComponent } from './profile/show-my-profilen/show-my-profilen.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { CenterOfInterestComponent } from './profile/center-of-interest/center-of-interest.component';
import { SecurityComponent } from './profile/security/security.component';
import { SetPasswordComponent } from './profile/security/set-password/set-password.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashoardComponent } from './admin/dashoard/dashoard.component';
import { PubsComponent } from './admin/pubs/pubs.component';
import { ProfilesComponent } from './admin/profiles/profiles.component';
import { UsersComponent } from './admin/users/users.component';
import { CreateUserComponent } from './admin/users/create-user/create-user.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import { ShowUsersComponent } from './admin/users/show-users/show-users.component';
import { ShowProfilesComponent } from './admin/profiles/show-profiles/show-profiles.component';
import { EditPubComponent } from './admin/pubs/edit-pub/edit-pub.component';
import { CreatePubComponent } from './admin/pubs/create-pub/create-pub.component';
import { ShowPubsComponent } from './admin/pubs/show-pubs/show-pubs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminEditProfileComponent } from './admin/profiles/admin-edit-profile/admin-edit-profile.component';

// services
import { FiltersService } from './services/filters/filters.service';
import { AuthService } from './services/auth/auth.service';
import { UploadService } from './services/upload/upload.service';
import { DownloadService } from './services/download/download.service';
import { GetEmailComponent } from './resetpass/get-email/get-email.component';
import { FiltrTablesComponent } from './admin/filtr-tables/filtr-tables.component';
import { PageNotAllowedComponent } from './page-not-allowed/page-not-allowed.component';
import { UserInfoComponent } from './admin/users/user-info/user-info.component';
import { HomePageImagesComponent } from './admin/home-page-images/home-page-images.component';
import { FilterPipe } from './main/main-default/publication/filter.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FiltersComponent,
    MainComponent,
    MainDefaultComponent,
    PublicationComponent,
    FooterComponent,
    PublicationDetailsComponent,
    AuthComponent,
    MainFiltreSelectionComponent,
    ListComponent,
    CardComponent,
    LoadingSpinnerComponent,
    RegisterComponent,
    ActivationComponent,
    ActivationTokenComponent,
    ProfileComponent,
    MyInfoComponent,
    ProfileFilterComponent,
    MyProfileComponent,
    ShowMyProfilenComponent,
    EditProfileComponent,
    UploadFormComponent,
    CenterOfInterestComponent,
    SecurityComponent,
    SetPasswordComponent,
    AdminComponent,
    SidebarComponent,
    DashoardComponent,
    PubsComponent,
    ProfilesComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    ShowUsersComponent,
    ShowProfilesComponent,
    EditPubComponent,
    CreatePubComponent,
    ShowPubsComponent,
    PageNotFoundComponent,
    AdminEditProfileComponent,
    GetEmailComponent,
    FiltrTablesComponent,
    PageNotAllowedComponent,
    UserInfoComponent,
    HomePageImagesComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    AppRouting,
    RecaptchaModule,
    MDBBootstrapModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
  ],

  providers: [
    FiltersService,
    AuthGuard,
    AuthService,
    UploadService,
    DownloadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
