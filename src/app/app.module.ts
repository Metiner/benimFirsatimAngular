
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
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
import { CreateNewDealComponent } from './create-new-deal/create-new-deal.component';
import { MaterialModule } from './material.module';
import './../polyfills';
import {FacebookModule} from "ngx-facebook";
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {AdsenseModule} from 'ng2-adsense';
import {A2tUiModule, Angular2TokenService} from 'angular2-token';
import {UpperPointTableComponent} from './upper-point-table/upper-point-table.component';
import {PopularCategoriesComponent} from './popular-categories/popular-categories.component';
import {GeneralViewComponent} from './general-view/general-view.component';

const appRoutes : Routes = [
  { path : 'deal/:dealId' , component:SingleDealComponent},
  { path : '' , component:DealComponent},
  { path : 'myProfile/:type', component : ProfileSettingsComponent},
  { path : 'createNewDeal', component: CreateNewDealComponent},
  { path : 'feedback' , component: FeedbackComponent}
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
    SignInComponent,
    CreateNewDealComponent,
    ProfileSettingsComponent,
    FeedbackComponent,
    UpperPointTableComponent,
    PopularCategoriesComponent,
    GeneralViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LottieAnimationViewModule.forRoot(),
    ScrollToModule.forRoot(), // scroll to library.
    RouterModule.forRoot(appRoutes),
    FacebookModule.forRoot(),
    MaterialModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8354755629319310'
    }),
    A2tUiModule
  ],
  providers: [BenimFirsatimLibrary,
              Angular2TokenService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AppModule { }
