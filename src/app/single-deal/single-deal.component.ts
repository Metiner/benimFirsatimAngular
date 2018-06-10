import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {commentStateTrigger} from "../animations";
import {ScrollToService,ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {Subscription} from 'rxjs/Subscription';
import {HeaderComponent} from "../header/header.component";
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
  showPointTableSubs: Subscription;
  showPointTable = true;


  animation:any;
  likeButtonAnimation:any;
  commentButtonAnimation:any;
  thumbUpAnimations=[];
  dealReported = false;
  sendCommentButtonActivated = false;
  animations:any;
  thereAreMoreCommentsHigherTen = false;
  commentCount=0;

  deal:any = {};
  constructor(public route: ActivatedRoute,
              public benimFirsatimLib:BenimFirsatimLibrary,
              private _scrollTo:ScrollToService,
              private ref: ChangeDetectorRef) {
    }

  ngOnInit() {

    $(document).ready(()=>{

      this.benimFirsatimLib.responsiveDesignFunc();
    })

    this.showPointTableSubs = this.benimFirsatimLib.showPointTableSub.subscribe({
      next: (data) => {
        this.showPointTable = data;
      }
    });

    this.loadAnimations();
    if (this.route.snapshot.params['dealId'] == 0) {
      this.deal = this.benimFirsatimLib.justCreatedDeal;
      this.dealId = this.benimFirsatimLib.justCreatedDeal.id;
    } else {

      this.benimFirsatimLib.getDeal(this.route.snapshot.params['dealId']).subscribe(response => {


        this.deal = response.json();
        this.benimFirsatimLib.getComments(this.route.snapshot.params['dealId']).subscribe(comments => {
          this.comments = comments.json();
          this.loadThumbsupAnimations();
          for (let i = 0; i < this.comments.length; i++) {
            this.comments[i].timeCalculation = this.timeCalculation(this.comments[i]);
            this.comments[i].showUntil = 2;
            this.comments[i].dahaFazlaGetirText = 'DAHA FAZLA GETİR';
            if (this.comments[i].comments.length > 0) {
              for (let j = 0; j < this.comments[i].comments.length; j++) {
                this.comments[i].comments[j].timeCalculation = this.timeCalculation(this.comments[i].comments[j]);
              }
            }
          }
        })
      });
    }
  }

  loadAnimations(){
    $(document).ready(()=>{
      this.animation = lottie.loadAnimation({
        container: document.getElementById("forLottie"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/kaydet_button.json' // the path to the animation json
      });
      this.likeButtonAnimation = lottie.loadAnimation({
        container: document.getElementById("lottieLikeButton"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/like_icon_round.json' // the path to the animation json
      });
      this.commentButtonAnimation = lottie.loadAnimation({
        container: document.getElementById("lottieCommentButton"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/animations/comment_icon_round.json' // the path to the animation json
      });
    })
  }

  loadThumbsupAnimations(){
    $(document).ready(()=>{
      this.animations = document.getElementsByClassName("lottieThumbUpButton");
      if(this.animations.length > 0){
        for(var i=this.commentIndex-10;i<this.animations.length;i++){
          this.thumbUpAnimations.push(
            lottie.loadAnimation({
              container:this.animations[i],
              renderer:'svg',
              autoplay: false,
              loop:false,
              path:'assets/animations/thumb_up_icon_round.json'
            })
          )
        }
      }
    })
  }
  playAnim(index,type,comment) {

    if(type === 'like'){
      this.likeButtonAnimation.play();
      if(this.likeButtonAnimation.liked){
        this.likeButtonAnimation.setDirection(-1);
        this.likeButtonAnimation.liked = false;
        this.benimFirsatimLib.upVoteDeal(this.deal.id).subscribe(response=>{
          this.deal.votes_sum = response.json().deal_score;
        });

      }else{
        this.likeButtonAnimation.setDirection(1);
        this.likeButtonAnimation.liked = true;
        this.benimFirsatimLib.downVoteDeal(this.deal.id).subscribe(response=>{
          this.deal.votes_sum = response.json().deal_score;
        });
      }
    }else if(type === 'thumbsUp'){

      this.thumbUpAnimations[index].play();
      this.benimFirsatimLib.commentVote(comment.id).subscribe(response =>{
        comment.comment_votes_count = response.json().vote_count;
      })
      if(this.thumbUpAnimations[index].liked){
        this.thumbUpAnimations[index].setDirection(-1);
        this.thumbUpAnimations[index].liked = false;
      }else{
        this.thumbUpAnimations[index].setDirection(1);
        this.thumbUpAnimations[index].liked = true;
      }
    }else{
      this.commentButtonAnimation.play();
    }

  }

  stopAnim(index) {
    this.commentButtonAnimation.stop();
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
      this.sendCommentButtonActivated = true;
      var comment:any = {};
      comment.text = this.newlyAddedComment;
      comment.user = this.benimFirsatimLib.currentUser;
      comment.timeCalculation = "";
      this.newlyAddedComments.push(comment);
      this.benimFirsatimLib.createComment(this.route.snapshot.params['dealId'],null,this.newlyAddedComment).subscribe((response)=>{
        this.sendCommentButtonActivated = false;
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
      this.thereAreMoreCommentsHigherTen = true;
      this.loadThumbsupAnimations();
    }
  }
  writeCommentSubcomment(comment){
    comment.newlyAddedSubComments = [];
    var newlyAddedSubCommentTemp:any = {};
    newlyAddedSubCommentTemp.text = this.newlyAddedSubComment;
    newlyAddedSubCommentTemp.user = this.benimFirsatimLib.currentUser;
    newlyAddedSubCommentTemp.timeCalculation = "";
    comment.newlyAddedSubComments.push(newlyAddedSubCommentTemp);
    this.benimFirsatimLib.createComment(this.route.snapshot.params['dealId'],comment.id,this.newlyAddedSubComment).subscribe((response)=>{

    });
  }

  deadOnDeadLine(){
    this.benimFirsatimLib.ended(this.route.snapshot.params['dealId']).subscribe((response)=>{
    });
    this.dealReported = true;
  }
  dealOutOfStock(){
    this.benimFirsatimLib.stockFinished(this.route.snapshot.params['dealId']).subscribe((response)=>{
    });
    this.dealReported = true;
  }
  onReportDeal(){
    this.benimFirsatimLib.report(this.route.snapshot.params['dealId']).subscribe((response)=>{
    });
    this.dealReported = true;
  }

  favDeal(){
    this.benimFirsatimLib.favDeal(this.route.snapshot.params['dealId']).subscribe((response)=>{
    })
  }
  addSubcommentIndex(comment,index){
    if(index  === comment.comments.length ){
      comment.dahaFazlaGetirText = "HEPSİ BU KADAR :(";
    }
    comment.showUntil += 3;
  }
  whatIsPrice(deal){
    if(deal.price.indexOf(".0") === -1){
      return deal.price ? (deal.price + '₺') : '';
    }else{
      return deal.price ? (deal.price.slice(0,deal.price.indexOf(".")) + '₺') : '';
    }
  }
}
