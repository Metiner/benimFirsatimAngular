
import {Component} from '@angular/core';
import {slideInOutAnimation} from '../animations';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInOutAnimation]
})
export class HeaderComponent {
  categoriesAnimation = 'out';
  categories = [];
  constructor(public benimFirsatimLibrary:BenimFirsatimLibrary){
    this.benimFirsatimLibrary.getCategories().subscribe(response=>{
      this.categories = response.json();
    })
  }
  slideCategoriesDiv(state){
    this.categoriesAnimation = state;
  }
}
