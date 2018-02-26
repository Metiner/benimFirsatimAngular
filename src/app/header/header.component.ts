
import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {slideInOutAnimation} from '../animations';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInOutAnimation]
})
export class HeaderComponent {

  categoriesAnimation = 'out';
  myProfileAnimation = 'out';
  categories = [];

  constructor(public benimFirsatimLibrary:BenimFirsatimLibrary){
    this.benimFirsatimLibrary.getCategories().subscribe(response=>{
      this.categories = response.json();
    })
  }

  slideCategoriesDiv(state){
    this.categoriesAnimation = state;
  }
  slideMyProfileDiv(state){
    this.myProfileAnimation = state;
  }


  onCategoryChange(type){
    this.benimFirsatimLibrary.changeCategory(type);
  }
  getCategoryIcon(categoryId){
    var src = "";
    switch (categoryId){
      case 1:
        src = '../../assets/imgs/mode_tekstil_icon@2x.png';
        break;
      case 12:
        src = '../../assets/imgs/kisisel_bakim@2x.png';
        break;
      case 18:
          src = '../../assets/imgs/cinden_icon@2x.png';
        break;
      case 5:
          src = '../../assets/imgs/yazilim_icon@2x.png';
        break;
      case 13:
        src = '../../assets/imgs/eglence_icon@2x.png';
        break;
      case 3:
        src = '../../assets/imgs/elektronik_icon@2x.png';
        break;
      case 6:
        src = '../../assets/imgs/music_icon@2x.png';
        break;
      case 10:
        src = '../../assets/imgs/beyaz_esya_icon@2x.png';
        break;
      case 15:
        src = '../../assets/imgs/yeme_icme_icon@2x.png';
        break;
      case 2:
        src = '../../assets/imgs/aksesuar_icon@2x.png';
        break;
      case 4:
        src = '../../assets/imgs/mobilya_icon@2x.png';
        break;
      case 14:
        src = '../../assets/imgs/bilgisayar_icon@2x.png';
        break;
      case 16:
        src = '../../assets/imgs/tatil_gezi_icon@2x.png';
        break;
      case 19:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 17:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 7:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 8:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 10:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 11:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
      case 20:
        src = '../../assets/imgs/freebies_icon@2x.png';
        break;
    }
    return src;
  }
}
