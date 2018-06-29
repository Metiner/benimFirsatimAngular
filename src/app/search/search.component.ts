import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  initializeSearchDiv: boolean;
  searchDivSubscription: Subscription;
  constructor(private benimFirsatimLib: BenimFirsatimLibrary) {
    this.searchDivSubscription = this.benimFirsatimLib.searchInitializeSubject.subscribe({
     next: ( value ) => {
       this.initializeSearchDiv = value;
     }
    });
  }

  onSearchEvent(event): void {

    if (event.key === 'Enter') {

      this.benimFirsatimLib.search(event.path[0].value).subscribe(response => {
        this.benimFirsatimLib.searchResult = response.json();
        this.initializeSearchDiv = false;
        this.onCategoryChange('search');

      });
    }
    if (event.key === 'Escape') {
      this.benimFirsatimLib.searchInitializeSubject.next(false);
    }
  }
  onCategoryChange(type): void {
    this.benimFirsatimLib.showPointTable = true;
    this.benimFirsatimLib.currentPaging = 1;
    this.benimFirsatimLib.totalPage = 2;
    this.benimFirsatimLib.changeCategory(type);
  }
  ngOnInit() {
  }

}
