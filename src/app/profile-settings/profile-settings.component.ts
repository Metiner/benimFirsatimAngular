import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {tabActivationTrigger} from '../animations';
declare var $:any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  animations:[tabActivationTrigger]
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private benimFirsatimLibrary: BenimFirsatimLibrary,
              private route: Router) {
  }

  genelBakis = {active:'void'};
  yorumlar = {active:'void'};
  kaydedilenler = {active:'void'};
  firsatlar = {active:'void'};
  ayarlar = {active:'void'};

  currentUser;any={};

  ngOnInit() {

    this.currentUser = this.benimFirsatimLibrary.currentUser;

    if (this.activatedRoute.snapshot.params['type'] === 'myDeals') {
      this.benimFirsatimLibrary.currentCategory = 'myDeals';
      this.activeAnim("firsatlar");
      this.formatDeals();

      // disables points table
      this.benimFirsatimLibrary.showPointTable.next();
    }
  }

  formatDeals(){

    $(document).ready(()=>{
      var firsatlarim = document.getElementById("firsatlarim");
      firsatlarim.children[0].children[0].classList.remove("col-8");
      firsatlarim.children[0].children[0].classList.remove("offset-1");
      firsatlarim.children[0].children[0].classList.add("col");
      firsatlarim.children[0].children[0].children[0].removeAttribute("margin-top");

    })
  }

  activeAnim(element){
    if(element === 'genelBakis'){
      this.genelBakis.active = 'active';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'void';
    }
    if(element === 'firsatlar'){
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'active';
      this.ayarlar.active = 'void';
      this.formatDeals();
    }
    if(element === 'yorumlar'){
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'active';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'void';
    }
    if(element === 'kaydedilenler'){
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'active';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'void';
    }
    if(element === 'ayarlar'){
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'active';
    }
  }
}
