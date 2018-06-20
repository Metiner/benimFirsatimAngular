import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {tabActivationTrigger} from '../animations';
import {NgForm} from "@angular/forms";
declare var $:any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  animations:[tabActivationTrigger]
})
export class ProfileSettingsComponent implements OnInit {

  @ViewChild('password') password:HTMLElement;

  constructor(private activatedRoute: ActivatedRoute,
              private benimFirsatimLibrary: BenimFirsatimLibrary,
              private route: Router) {
  }


  genelBakis = {active:'void'};
  yorumlar = {active:'void'};
  kaydedilenler = {active:'void'};
  firsatlar = {active:'active'};
  ayarlar = {active:'void'};

  currentUser;any={};
  showUserInfoSection = true;
  showUpdateProfile = false;
  showAreYouSure = false;

  ngOnInit() {

    this.currentUser = this.benimFirsatimLibrary.currentUser;
    if (this.activatedRoute.snapshot.params['type'] === 'myDeals') {
      this.activeAnim("firsatlar");
      this.benimFirsatimLibrary.currentCategory = 'myDeals';
    }
    if(this.activatedRoute.snapshot.params['type'] === 'settings'){
      this.activeAnim("ayarlar");
    }
  }

  formatDeals(type){


    this.benimFirsatimLibrary.showPointTable = false;
    this.benimFirsatimLibrary.responsiveDesign.next();
    $(document).ready(()=>{
      var firsatlarim = document.getElementById(type);
      firsatlarim.children[0].children[0].classList.remove("col-8");
      firsatlarim.children[0].children[0].classList.remove("offset-1");
      firsatlarim.children[0].children[0].classList.add("col-12");
    })

  }

  activeAnim(element){
    if (element === 'genelBakis') {
      this.showUserInfoSection = true;
      this.showUpdateProfile = false;
      this.genelBakis.active = 'active';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'void';
    }
    if (element === 'firsatlar') {
      this.benimFirsatimLibrary.currentCategory = 'myDeals';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'active';
      this.showUserInfoSection = true;
      this.showUpdateProfile = false;
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.ayarlar.active = 'void';
      this.formatDeals("firsatlarim");
    }
    if (element === 'yorumlar') {
      this.showUserInfoSection = true;
      this.showUpdateProfile = false;
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'active';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'void';
      this.ayarlar.active = 'void';
    }
    if (element === 'kaydedilenler') {
      this.benimFirsatimLibrary.currentCategory = 'myFavs';
      this.firsatlar.active = 'void';
      this.kaydedilenler.active = 'active';
      this.showUserInfoSection = true;
      this.showUpdateProfile = false;
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.ayarlar.active = 'void';
      this.formatDeals("favs");
    }
    if (element === 'ayarlar') {
      this.showUpdateProfile = true;
      this.showUserInfoSection = false;
      this.genelBakis.active = 'void';
      this.yorumlar.active = 'void';
      this.kaydedilenler.active = 'void';
      this.firsatlar.active = 'active';
      this.ayarlar.active = 'active';
      this.formatDeals("firsatlarim");
    }
  }
  onProfileUpdateSubmit(form:NgForm){
    if(form.value.password === '' && form.value.rePassword === '' && form.value.username.length > 6){
      if(form.value.password === form.value.rePassword){
        this.benimFirsatimLibrary.updateUser(form.value.username,form.value.password).subscribe(response=>{
          //nativeElement.style.color
        })
      }
    }

    //this.benimFirsatimLibrary.updateUser()
  }
  onDeleteProfile(){
    this.showAreYouSure = !this.showAreYouSure;

  }


}
