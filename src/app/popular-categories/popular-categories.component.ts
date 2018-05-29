import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {

  popularCategories = [1,2,3];

  constructor() { }

  ngOnInit() {
  }

}
