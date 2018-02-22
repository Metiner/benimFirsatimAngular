import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {BenimFirsatimLibrary} from "./services/benimFirsatimLibrary";
import {ContentComponent} from "./content/content.component";
import { PointTableComponent } from './point-table/point-table.component';
import { DealComponent } from './deal/deal.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    PointTableComponent,
    DealComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [BenimFirsatimLibrary],
  bootstrap: [AppComponent]
})
export class AppModule { }
