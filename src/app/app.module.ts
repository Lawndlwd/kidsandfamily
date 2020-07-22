import { FiltersService } from './services/filters/filters.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MainFiltreSelectionComponent } from './main/main-filtre-selection/main-filtre-selection.component';
import { ListComponent } from './main/main-filtre-selection/list/list.component';
import { CardComponent } from './main/main-filtre-selection/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    MainFiltreSelectionComponent,
    ListComponent,
    CardComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    HttpClientModule
  ],
  
  providers: [
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
