import { FiltersService } from './services/filters/filters.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FiltersComponent } from './filters/filters.component';
import { MainComponent } from './main/main.component';
import { MainDefultComponent } from './main/main-defult/main-defult.component';
import { PublicationComponent } from './main/main-defult/publication/publication.component';

import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FiltersComponent,
    MainComponent,
    MainDefultComponent,
    PublicationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
