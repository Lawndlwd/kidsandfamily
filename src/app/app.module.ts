import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';



import { AppRoutingModule } from './app.routing.module';
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
import { FiltersService } from './services/filters/filters.service';
import { RegisterComponent } from './auth/register/register.component';
import { ActivationComponent } from './activation/activation.component';
import { ActivationTokenComponent } from './activation-token/activation-token.component';
import { AuthService } from './services/auth/auth.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ProfileComponent} from './profile/profile.component';
import {MyInfoComponent} from './profile/my-info/my-info.component';
import { ProfileFilterComponent } from './profile/profile-filter/profile-filter.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ShowMyProfilenComponent } from './profile/show-my-profilen/show-my-profilen.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { CenterOfInterestComponent } from './profile/center-of-interest/center-of-interest.component';
import { SecurityComponent } from './profile/security/security.component';
import { SetPasswordComponent } from './profile/security/set-password/set-password.component';




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
    CenterOfInterestComponent,
    SecurityComponent,
    SetPasswordComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxPaginationModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        AppRoutingModule,
        RecaptchaModule,
        MDBBootstrapModule.forRoot(),
    ],

  providers: [
    FiltersService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
