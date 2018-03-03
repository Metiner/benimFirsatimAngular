import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";
import {HeaderComponent} from "../header/header.component";
import {dealStateTrigger} from "../animations";
import {AnimationEvent} from "@angular/animations";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
  animations:[dealStateTrigger]
})
export class DealComponent implements OnInit {

  deals = [];
  displayedDeals = [];
  pageCode = "hot";
  mySubscription: Subscription;

  constructor(public benimFirsatimLib:BenimFirsatimLibrary) {

    var page = this;
    this.mySubscription = this.benimFirsatimLib.categoryChanged.subscribe({
      next: () => {
        this.setDeals();
      }
    })


  }
  ngOnInit(){
    this.setDeals();
  }

  setDeals(){
    this.benimFirsatimLib.getPage(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe((data) => {
      this.displayedDeals = [];
      this.deals = data.json();
      if(this.deals.length >= 1){
        this.displayedDeals.push(this.deals[0]);
      }
    });

  }

  onDealAnimated(event:AnimationEvent,lastItemIndex){

    if(event.fromState != 'void'){
      return;
    }
    if(this.deals.length > lastItemIndex + 1){
      this.displayedDeals.push(this.deals[lastItemIndex+1])
    }else{
      this.deals = this.displayedDeals;
    }
  }

  isItLastItem(deal){
    if(this.deals[this.deals.length-1].id == deal.id)
      return true;
  }

}
