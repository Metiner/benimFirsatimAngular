
import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {slideInOutAnimation} from '../animations';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subject} from "rxjs/Subject";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInOutAnimation]
})
export class HeaderComponent {

  oneCikanlarAnimConf: Object;
  yukselenlerAnimConf: Object;
  yenilerAnimConf: Object;
  categoriesAnimConf: Object;

  oneCikanlarAnim:any;
  yukselenlerAnim:any;
  yenilerAnim:any;
  categoriesAnim:any;

  categoriesAnimation = 'out';
  myProfileAnimation = 'out';
  categories = [];

  isAuth = false;

  constructor(public benimFirsatimLibrary:BenimFirsatimLibrary,
              public router:Router){

    this.initializeAnims();
    this.checkAuth();
    this.benimFirsatimLibrary.getCategories().subscribe(response=> {
      this.categories = response.json();


    });
  }

  checkAuth(){
    this.isAuth = this.benimFirsatimLibrary.isAutho;
  }
  goToSignUp(){
    this.router.navigate(['signUp']);
  }
  initializeAnims() {
    this.oneCikanlarAnimConf = {
      path: 'assets/animations/one_cikanlar_anim.json',
      autoplay: false,
      loop: true
    };
    this.yukselenlerAnimConf = {
      path: 'assets/animations/yukselenler_anim.json',
      autoplay: false,
      loop: true
    };
    this.yenilerAnimConf = {
      path: 'assets/animations/yeniler_anim.json',
      autoplay: false,
      loop: true
    };
    this.categoriesAnimConf = {
      path: 'assets/animations/categories.json',
      autoplay: false,
      loop: true
    };
  }
  createAnim(anim,type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim = anim;
        break;
      case 2:
        this.yukselenlerAnim = anim;
        break;
      case 3:
        this.yenilerAnim = anim;
        break;
      case 4:
        this.categoriesAnim = anim;
        break;
    }
  }
  playAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.play();
        break;
      case 2:
        this.yukselenlerAnim.play();
        break;
      case 3:
        this.yenilerAnim.play();
        break;
      case 4:
        this.categoriesAnim.play();
        break;
    }
  }
  pauseAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.pause();
        break;
      case 2:
        this.yukselenlerAnim.pause();
        break;
      case 3:
        this.yenilerAnim.pause();
        break;
      case 4:
        this.categoriesAnim.pause();
        break;
    }
  }
  stopAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.stop();
        break;
      case 2:
        this.yukselenlerAnim.stop();
        break;
      case 3:
        this.yenilerAnim.stop();
        break;
      case 4:
        this.categoriesAnim.stop();
        break;
    }
  }
  slideCategoriesDiv(state){
    this.categoriesAnimation = state;
  }
  slideMyProfileDiv(state){
    this.myProfileAnimation = state;
  }
  onCategoryChange(type){
    this.benimFirsatimLibrary.getPage(type,1);
    this.benimFirsatimLibrary.changeCategory(type);

  }
  getCategoryIcon(categoryId){
    var src = "";
    switch (categoryId){
      case 1:
        src = 'assets/svgs/categoryIconSvgs/mode_tekstil_icon.svg';
        break;
      case 12:
        src = 'assets/svgs/categoryIconSvgs/kisisel_bakim.svg';
        break;
      case 18:
          src = 'assassets/svgs/categoryIconSvgs/cinden_icon.svg';
        break;
      case 5:
          src = 'assets/svgs/categoryIconSvgs/yazilim_icon.svg';
        break;
      case 13:
        src = 'assets/svgs/categoryIconSvgs/eglence_icon.svg';
        break;
      case 3:
        src = 'assets/svgs/categoryIconSvgs/elektronik_icon.svg';
        break;
      case 6:
        src = 'assets/svgs/categoryIconSvgs/music_icon.svg';
        break;
      case 10:
        src = 'assets/svgs/categoryIconSvgs/beyaz_esya_icon.svg';
        break;
      case 15:
        src = 'assets/svgs/categoryIconSvgs/yeme_icme_icon.svg';
        break;
      case 2:
        src = 'assets/svgs/categoryIconSvgs/aksesuar_icon.svg';
        break;
      case 4:
        src = 'assets/svgs/categoryIconSvgs/mobilya_icon.svg';
        break;
      case 14:
        src = 'assets/svgs/categoryIconSvgs/bilgisayar_icon.svg';
        break;
      case 16:
        src = 'assets/svgs/categoryIconSvgs/tatil_gezi_icon.svg';
        break;
      case 19:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon.svg';
        break;
      case 17:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
      case 7:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
      case 8:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
      case 10:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
      case 11:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
      case 20:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon@2x.png';
        break;
    }
    return src;
  }
}
