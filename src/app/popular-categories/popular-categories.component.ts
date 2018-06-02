import { Component, OnInit } from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {

  categories = [];

  constructor(public benimFirsatimLibrary: BenimFirsatimLibrary) {
    this.benimFirsatimLibrary.getTopCategories().subscribe((topCategories)=>{

      this.categories = topCategories.json().sort((a, b) => {
        return b.deals_count - a.deals_count;
      });

      this.categories = this.categories.slice(0,3);
    });
  }

  ngOnInit() {
  }


}
