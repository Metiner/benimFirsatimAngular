import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";
import {dealStateTrigger} from "../animations";
import {AnimationEvent} from "@angular/animations";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
  animations:[dealStateTrigger]
})
export class DealComponent implements OnInit, OnDestroy {

  deals = [];
  displayedDeals = [];
  mySubscription: Subscription;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public route: Router) {

    this.mySubscription = this.benimFirsatimLib.categoryChanged.subscribe({
      next: () => {
        this.setDeals();
      }
    });
  }
  ngOnInit(){
    this.setDeals();
  }
  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

  setDeals(){
    this.benimFirsatimLib.getPage(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe( (data) => {
      let responseData = data.json();
      this.displayedDeals = [];
      this.deals = responseData.entries;
      this.benimFirsatimLib.currentDeals = this.deals;
      this.benimFirsatimLib.currentPaging = responseData.current_page;
      this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10)+1;
      if (this.deals.length >= 1) {
        this.displayedDeals.push(this.deals[0]);
      }
    });
  }

  onDealAnimated(event: AnimationEvent, lastItemIndex){

    if (event.fromState !== 'void'){
      return;
    }
    if(this.deals.length > lastItemIndex + 1){
      this.displayedDeals.push(this.deals[lastItemIndex + 1]);
      this.benimFirsatimLib.dealAnimationContinues = true;
    } else {
      this.benimFirsatimLib.dealAnimationContinues = false;
      this.deals = this.displayedDeals;
    }
  }

  goToDeal(dealId){
    this.route.navigate(['/deal/' + dealId]);
  }

  isItLastItem(deal){
    if(this.deals[this.deals.length - 1].id === deal.id)
      return true;
  }
  goToLink(link: string){
    window.open(link, '_blank');
  }

}
