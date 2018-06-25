import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {dealStateTrigger} from '../animations';
import {AnimationEvent} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FacebookService} from "ngx-facebook";
import {NgForm} from '@angular/forms';
import {HeaderComponent} from "../header/header.component";

declare var lottie: any;
declare var $: any;
declare var FB: any;

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
  animations: [dealStateTrigger]
})
export class DealComponent implements OnInit, OnDestroy {

  mySubscription: Subscription;
  showPointTableSubs : Subscription;


  deals = [];
  displayedDeals = [];
  likeButtonAnimations = [];
  commentButtonAnimations = [];

  resultText = "";

  showPointTable = false;
  showResultText = false;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public route: Router,
              public fb: FacebookService) {

    $(document).ready(()=>{
      this.showPointTable = this.benimFirsatimLib.showPointTable;
      this.benimFirsatimLib.responsiveDesignFunc();
    })

    this.mySubscription = this.benimFirsatimLib.categoryChanged.subscribe({
      next: () => {
        this.setDeals();
      }
    });
    this.showPointTableSubs = this.benimFirsatimLib.showPointTableSub.subscribe({
      next: (data) => {
        this.showPointTable = data;
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
          this.showResultText = false;
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
        this.showResultText = false;
        this.benimFirsatimLib.getFavDeal().subscribe(data => {
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
      } else if(this.benimFirsatimLib.currentCategory === 'search'){
          if(this.benimFirsatimLib.searchResult.entries.length === 0 ){
            this.resultText = 'Ooops, sanırım böyle bir şey yok :(';
            this.showResultText = true;
          }else{
            this.showResultText = false;
            this.displayedDeals = [];
            this.deals = this.benimFirsatimLib.searchResult.entries;
            this.benimFirsatimLib.currentDeals = this.deals;
            this.benimFirsatimLib.currentPaging = this.benimFirsatimLib.searchResult.current_page;
            this.benimFirsatimLib.totalPage = Math.floor(this.benimFirsatimLib.searchResult.total_entries / 10) + 1;
            if (this.deals.length >= 1) {
              this.displayedDeals.push(this.deals[0]);
            }
          }
      } else {
        this.benimFirsatimLib.getPage(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe((data) => {
          let responseData = data.json();
          this.showResultText = false;
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
        this.showResultText = false;
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

    if (this.likeButtonAnimations.length > 8) {
      this.likeButtonAnimations.length = 0;
    }
    this.likeButtonAnimations.push(lottie.loadAnimation({
      container: likeContainer, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/like_icon_round.json' // the path to the animation json
    }));

    this.commentButtonAnimations.push(lottie.loadAnimation({
      container: commentContainer, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/animations/comment_icon_round.json' // the path to the animation json
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

  playAnim(index, type,deal) {
    if (type === 'like') {

      this.likeButtonAnimations[index].play();
      if (this.likeButtonAnimations[index].liked) {

        this.benimFirsatimLib.downVoteDeal(deal.id).subscribe(response=>{
          deal.votes_sum = response.json().deal_score;
        });

        this.likeButtonAnimations[index].setDirection(-1);
        this.likeButtonAnimations[index].liked = false;


      } else {
        this.benimFirsatimLib.upVoteDeal(deal.id).subscribe(response=>{
          deal.votes_sum = response.json().deal_score;
        });

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

  shareDeal(deal,type){
      switch (type){
        case 'fb':
          FB.ui({
            method: 'share',
            mobile_iframe: true,
            quote: deal.title,
            href: "https://benimfirsatim.com/deal/" + deal.id,
            hastag: '#benimfirsatim'
          }, function(response){});
          break;
        case 'tw':
          // Opens a pop-up with twitter sharing dialog
          var shareURL = "http://twitter.com/share?"; //url base
          //params
          var params = {
            url: "https://benimfirsatim.com/deal/" + deal.id,
            text: deal.title,
            // via: "sometwitterusername",
            hashtags: "benimfirsatim"
          }
          for(let prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
          window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

          break;

      }
  }


}
