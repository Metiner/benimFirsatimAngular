
import {Component} from '@angular/core';
import {slideInOutAnimation} from "../animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInOutAnimation]
})
export class HeaderComponent {
  categoriesAnimation = 'out';
  categories = ["selamın","aleyküm"];

  slideCategoriesDiv(state){
    this.categoriesAnimation = state;
  }
}
