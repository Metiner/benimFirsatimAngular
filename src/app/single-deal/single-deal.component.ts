import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {commentStateTrigger} from "../animations";
import {ScrollToService,ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
declare var lottie: any;
declare var $:any

@Component({
  selector: 'app-single-deal',
  templateUrl: './single-deal.component.html',
  styleUrls: ['./single-deal.component.scss'],
  animations:[commentStateTrigger]
})
export class SingleDealComponent implements OnInit {

  dealId:string = "";
  newlyAddedComment = "";
  newlyAddedComments = [];
  newlyAddedSubComment = "";
  comments = [];
  commentIndex = 10;
  animation:any;


  deal:any;
  constructor(public route:ActivatedRoute,
              public benimFirsatimLib:BenimFirsatimLibrary,
              private _scrollTo:ScrollToService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadAnimations();
    if(this.route.snapshot.params['dealId'] == 0){
      this.deal = this.benimFirsatimLib.justCreatedDeal;
    }else{
      this.dealId = this.route.snapshot.params['dealId'];
      this.deal = this.benimFirsatimLib.getDealById(this.dealId);
      this.benimFirsatimLib.getComments(this.dealId).subscribe(comments=>{
        this.comments = comments.json();
        for(let i=0;i<this.comments.length;i++){
          this.comments[i].timeCalculation = this.timeCalculation(this.comments[i]);
          if(this.comments[i].comments.length > 0){
            for(let j=0;j<this.comments[i].comments.length;j++){
              this.comments[i].comments[j].timeCalculation = this.timeCalculation(this.comments[i].comments[j]);
            }
          }
        }
      })
    }

    // ScrollActivate(this);
    //
    //
    // function ScrollActivate(page) {
    //
    //   $(window).on("scroll", function () {
    //     if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    //       $(window).off("scroll");
    //       console.log(page.comments);
    //       page.commentIndex = page.commentIndex + 5;
    //     }
    //   });
    // }
    // this.ref.detectChanges();
  }

  loadAnimations(){
    this.animation = lottie.loadAnimation({
      container: document.getElementById("forLottie"), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/kaydet_button.json' // the path to the animation json
    });
  }
  playSegments(from,to){
    this.animation.playSegments([from,to],true);
  }
  timeCalculation(comment){
    return this.timeConversion(Date.now()-Date.parse(comment.created_at));
  }
  timeConversion(millisec) {

    let seconds = Number((millisec / 1000).toFixed());

    let minutes = Number((millisec / (1000 * 60)).toFixed());

    let hours = Number((millisec / (1000 * 60 * 60)).toFixed());

    let days = Number((millisec / (1000 * 60 * 60 * 24)).toFixed());

    if (seconds < 60) {
      return seconds + " Saniye önce";
    } else if (minutes < 60) {
      return minutes + " Dakika önce";
    } else if (hours < 24) {
      return hours + " Saat önce";
    } else {
      return days + " Gün önce"
    }
  }
  isHaveSubComment(comment){
    if(comment.comments.length > 0)
      return true;
    else
      return false;
  }
  isItLastItem(comment){
    if(this.comments[this.comments.length-1].id == comment.id)
      return true;
  }
  writeToComment(comment){
    console.log(comment);
    comment.writeCommentToComment = true;
    this.scrollToTop();
  }
  scrollToTop(){

    const config: ScrollToConfigOptions = {
      offset : 400
    }

    this._scrollTo.scrollTo(config);
  }

  goToLink(link:string){
    window.open(link, '_blank');
  }

  sendComment(){
    if(this.benimFirsatimLib.isAutho){
      var comment:any = {};
      comment.text = this.newlyAddedComment;
      comment.user = this.benimFirsatimLib.currentUser;
      comment.timeCalculation = "";
      this.newlyAddedComments.push(comment);
      this.benimFirsatimLib.createComment(this.dealId,null,this.newlyAddedComment).subscribe((response)=>{
        console.log(response);
      });
    }else{
      this.benimFirsatimLib.openSignUpPopUp.next();
    }
  }

  loadMoreComment(){
    if(this.comments.length < this.commentIndex){
      document.getElementById("loadMoreText").innerText = "HEPSİ BU KADAR :("
    }else{
      this.commentIndex = this.commentIndex + 10;
    }
  }
  writeCommentSubcomment(comment){
    comment.newlyAddedSubComments = [];
    var newlyAddedSubCommentTemp:any = {};
    newlyAddedSubCommentTemp.text = this.newlyAddedSubComment;
    newlyAddedSubCommentTemp.user = this.benimFirsatimLib.currentUser;
    newlyAddedSubCommentTemp.timeCalculation = "";
    comment.newlyAddedSubComments.push(newlyAddedSubCommentTemp);
    this.benimFirsatimLib.createComment(this.dealId,comment.id,this.newlyAddedSubComment).subscribe((response)=>{
      console.log(response);
    });
  }

}
