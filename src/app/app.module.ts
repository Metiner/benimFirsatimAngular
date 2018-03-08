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
import {LottieAnimationViewModule} from 'ng-lottie';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {RouterModule, Routes} from "@angular/router";
import { SingleDealComponent } from './single-deal/single-deal.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const appRoutes : Routes = [
  { path : 'deal/:dealId' , component:SingleDealComponent},
  { path : '' , component:DealComponent},
  {path : 'signUp' , component:SignUpComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    PointTableComponent,
    DealComponent,
    FooterComponent,
    SingleDealComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LottieAnimationViewModule.forRoot(),
    ScrollToModule.forRoot(), // scroll to library.
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BenimFirsatimLibrary,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
