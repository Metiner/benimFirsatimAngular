import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  static pagination = 1;
  deals = [];
  pageCode = "hot";

  constructor(public benimFirsatimLib:BenimFirsatimLibrary) {
    this.setDeals(this.pageCode);
    this.benimFirsatimLib.categoryChanged.subscribe({
      next: (pageCode: string) => {
        this.setDeals(pageCode);
      }
    })


  }
  ngOnInit(){

  }

  setDeals(pageCode){

    this.benimFirsatimLib.getPage(pageCode, DealComponent.pagination).subscribe((data) => {

      this.deals = data.json();
    });

  }

  isItLastItem(deal){
    if(this.deals[this.deals.length-1].id == deal.id)
      return true;
  }

}
