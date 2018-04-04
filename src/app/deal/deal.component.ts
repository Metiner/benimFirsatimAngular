import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";
import {dealStateTrigger} from "../animations";
import {AnimationEvent} from "@angular/animations";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
declare var lottie:any;

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
  showPointTableSubs: Subscription;
  likeButtonAnimations = [];
  commentButtonAnimations = [];
  showPointTable = true;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public route: Router) {

    this.mySubscription = this.benimFirsatimLib.categoryChanged.subscribe({
      next: () => {
        this.setDeals();
      }
    });
    this.showPointTableSubs = this.benimFirsatimLib.showPointTable.subscribe({
      next: ()=>{
        console.log("lol")
        this.showPointTable = false;
      }
    })
  }
  ngOnInit(){
    this.setDeals();

  }
  ngOnDestroy(){
    this.mySubscription.unsubscribe();
    this.showPointTableSubs.unsubscribe();
  }

  setDeals(){
    if(typeof this.benimFirsatimLib.currentCategory  === "string"){

      if(this.benimFirsatimLib.currentCategory === 'myDeals'){
        this.benimFirsatimLib.getDealFromUser(this.benimFirsatimLib.currentPaging).subscribe(data=>{
          let responseData = data.json();
          this.displayedDeals = [];
          this.deals = responseData.entries;
          this.benimFirsatimLib.currentDeals = this.deals;
          this.benimFirsatimLib.currentPaging = responseData.current_page;
          this.benimFirsatimLib.totalPage = Math.floor(responseData.total_entries / 10)+1;
          if (this.deals.length >= 1) {
            this.displayedDeals.push(this.deals[0]);
          }

        })
      }else{
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
    }else{
      this.benimFirsatimLib.getCategoryDeals(this.benimFirsatimLib.currentCategory, this.benimFirsatimLib.currentPaging).subscribe( (data) => {
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




  }

  onDealAnimated(event: AnimationEvent, lastItemIndex){
    if(lastItemIndex < 10){
      this.loadAnimations(lastItemIndex);
    }
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

  loadAnimations(index) {

    var likeButtons = document.getElementsByClassName("lottieLikeButton");
      this.likeButtonAnimations.push(lottie.loadAnimation({
        container: likeButtons[index], // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/like_button.json' // the path to the animation json
      }));

    var commentButtons = document.getElementsByClassName("lottieCommentButton");
      this.commentButtonAnimations.push(lottie.loadAnimation({
        container: commentButtons[index], // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/comment_button.json' // the path to the animation json
      }));
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
  playAnim(index,type) {
    if(type === 'like'){
      this.likeButtonAnimations[index].playSegments(0,100);
    }
    else{
      this.commentButtonAnimations[index].play();
      }
    }
  stopAnim(index) {
    this.likeButtonAnimations[index].stop();
  }

}
