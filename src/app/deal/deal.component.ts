import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {dealStateTrigger} from '../animations';
import {AnimationEvent} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FacebookService} from "ngx-facebook";
import {NgForm} from '@angular/forms';

declare var lottie: any;
declare var $: any;

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
  animations: [dealStateTrigger]
})
export class DealComponent implements OnInit, OnDestroy {

  deals = [];
  displayedDeals = [];
  mySubscription: Subscription;
  showPointTableSubs: Subscription;
  likeButtonAnimations = [];
  commentButtonAnimations = [];
  likeButtons: any = [];
  commentButtons: any = [];
  showPointTable = true;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public route: Router,
              public fb: FacebookService) {

    this.mySubscription = this.benimFirsatimLib.categoryChanged.subscribe({
      next: () => {
        this.setDeals();
      }
    });
    this.showPointTableSubs = this.benimFirsatimLib.showPointTable.subscribe({
      next: () => {
        this.showPointTable = false;
      }
    });
  }

  ngOnInit() {

    this.setDeals();

  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    this.showPointTableSubs.unsubscribe();
  }

  setDeals() {
    this.deals = [];
    this.displayedDeals = [];

    if (typeof this.benimFirsatimLib.currentCategory === 'string') {

      if (this.benimFirsatimLib.currentCategory === 'myDeals') {
        this.benimFirsatimLib.getDealFromUser(this.benimFirsatimLib.currentPaging).subscribe(data => {
          let responseData = data.json();
          this.displayedDeals = [];
          this.deals = responseData.entries;
          this.benimFirsatimLib.currentDeals = this.deals;
          this.benimFirsatimLib.currentPaging = responseData.current_page;
          this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10) + 1;
          if (this.deals.length >= 1) {
            this.displayedDeals.push(this.deals[0]);
          }
        });
      } else if (this.benimFirsatimLib.currentCategory === 'myFavs') {
        this.benimFirsatimLib.getFavDeal().subscribe(data => {
          let responseData = data.json();
          this.displayedDeals = [];
          this.deals = responseData;
          this.benimFirsatimLib.currentDeals = this.deals;
          this.benimFirsatimLib.currentPaging = responseData.current_page;
          this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10) + 1;
          if (this.deals.length >= 1) {
            this.displayedDeals.push(this.deals[0]);
          }
        });
      } else {
        this.benimFirsatimLib.getPage(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe((data) => {
          let responseData = data.json();
          console.log(data.json());
          this.displayedDeals = [];
          this.deals = responseData.entries;
          this.benimFirsatimLib.currentDeals = this.deals;
          this.benimFirsatimLib.currentPaging = responseData.current_page;
          this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10) + 1;
          if (this.deals.length >= 1) {
            this.displayedDeals.push(this.deals[0]);
          }

        });
      }
    } else {
      this.benimFirsatimLib.getCategoryDeals(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe((data) => {
        let responseData = data.json();
        this.displayedDeals = [];
        this.deals = responseData.entries;
        this.benimFirsatimLib.currentDeals = this.deals;
        this.benimFirsatimLib.currentPaging = responseData.current_page;
        this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10) + 1;
        if (this.deals.length >= 1) {
          this.displayedDeals.push(this.deals[0]);
        }
      });
    }
  }

  onDealAnimated(event: AnimationEvent, lastItemIndex, likeContainer, commentContainer) {
    if (lastItemIndex < 10) {
      this.loadAnimations(lastItemIndex, likeContainer, commentContainer);
    }
    if (event.fromState !== 'void') {
      return;
    }
    if (this.deals.length > lastItemIndex + 1) {
      this.displayedDeals.push(this.deals[lastItemIndex + 1]);
      this.benimFirsatimLib.dealAnimationContinues = true;
    } else {
      this.benimFirsatimLib.dealAnimationContinues = false;
      this.deals = this.displayedDeals;
    }
  }

  loadAnimations(index, likeContainer, commentContainer) {

    if (this.likeButtonAnimations.length > 9) {
      this.likeButtonAnimations.length = 0;
    }
    this.likeButtonAnimations.push(lottie.loadAnimation({
      container: likeContainer, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/like_button.json' // the path to the animation json
    }));

    this.commentButtonAnimations.push(lottie.loadAnimation({
      container: commentContainer, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/animations/comment_button.json' // the path to the animation json
    }));


  }

  goToDeal(dealId) {
    this.route.navigate(['/deal/' + dealId]);
  }

  isItLastItem(deal) {
    if (this.deals[this.deals.length - 1].id === deal.id)
      return true;
  }

  goToLink(link: string) {
    window.open(link, '_blank');
  }

  playAnim(index, type) {
    if (type === 'like') {
      this.likeButtonAnimations[index].play();
      if (this.likeButtonAnimations[index].liked) {

        this.likeButtonAnimations[index].setDirection(-1);
        this.likeButtonAnimations[index].liked = false;

      } else {
        this.likeButtonAnimations[index].setDirection(1);
        this.likeButtonAnimations[index].liked = true;
      }
    }
    else {
      this.commentButtonAnimations[index].play();
    }
  }

  stopAnim(index) {
    this.commentButtonAnimations[index].stop();
  }

  whatIsPrice(deal){
    try {

      if(deal.price.indexOf(".0") === -1){
        return deal.price ? (deal.price + '₺') : '';
      }else{
        return deal.price ? (deal.price.slice(0,deal.price.indexOf(".")) + '₺') : '';
      }
    }catch (e)
    {

    }
  }

  shareDeal(deal){
    this.fb.ui(
      {
        method: 'feed',
        name: deal.title,
        link: 'benimfirsatim.com/deal/' + deal.id,
        picture: "benimfirsatim.com" + deal.image_url,
        caption: 'Top 3 reasons why you should care about your finance',
        description: "What happens when you don't take care of your finances? Just look at our country -- you spend irresponsibly, get in debt up to your eyeballs, and stress about how you're going to make ends meet. The difference is that you don't have a glut of taxpayers…",
        message: ""
      });
  }


  onFeedbackSubmit(f:NgForm){
    console.log(f.value);
  }

}
