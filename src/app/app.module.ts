import { FiltersService } from './services/filters/filters.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PublicationDetailsComponent } from './main/main-default/publication-details/publication-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FiltersComponent } from './filters/filters.component';
import { MainComponent } from './main/main.component';
import { MainDefaultComponent } from './main/main-default/main-default.component';
import { PublicationComponent } from './main/main-default/publication/publication.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthComponent } from './auth/auth.component';
import { FormsModule }   from '@angular/forms';


const appRoutes: Routes = [
  { path: 'publications', component: PublicationComponent },
  { path: 'publications-details/:id', component: PublicationDetailsComponent },
  { path: 'auth', component: AuthComponent }
];

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
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    FormsModule

  ],
  providers: [
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
