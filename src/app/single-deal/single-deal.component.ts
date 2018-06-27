import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {commentStateTrigger} from "../animations";
import {ScrollToService,ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {Subscription} from 'rxjs/Subscription';
import {HeaderComponent} from "../header/header.component";
import set = Reflect.set;
import {MatSnackBar} from "@angular/material";
declare var lottie: any;
declare var $:any
declare var FB:any;

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

  preventDuplicate = false;

  deal:any;
  constructor(public route: ActivatedRoute,
              public benimFirsatimLib:BenimFirsatimLibrary,
              private _scrollTo:ScrollToService,
              private snackBar:MatSnackBar) {
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

    if (this.route.snapshot.params['dealId'] == 0) {
      this.deal = this.benimFirsatimLib.justCreatedDeal;
      this.dealId = this.benimFirsatimLib.justCreatedDeal.id;
    } else {

      this.benimFirsatimLib.getDeal(this.route.snapshot.params['dealId']).subscribe(response => {



        this.deal = response.json();
        this.benimFirsatimLib.getComments(this.route.snapshot.params['dealId']).subscribe(comments => {
          this.comments = comments.json();
          this.loadAnimations();
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
      if(this.deal.is_liked_by_me){
        this.playAnim(0,'like',"");
      }

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
        this.benimFirsatimLib.downVoteDeal(this.deal.id).subscribe(response=>{
          this.deal.votes_sum = response.json().deal_score;
        });

      }else{
        this.likeButtonAnimation.setDirection(1);
        this.likeButtonAnimation.liked = true;
        this.benimFirsatimLib.upVoteDeal(this.deal.id).subscribe(response=>{
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

  stopAnim() {
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
      return " | " + seconds + " Saniye önce";
    } else if (minutes < 60) {
      return " | "  + minutes + " Dakika önce";
    } else if (hours < 24) {
      return " | " + hours + " Saat önce";
    } else {
      return " | " + days + " Gün önce"
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
  writeToComment(comment,scrollToMe){

    comment.writeCommentToComment = true;
    this.scrollToTop(scrollToMe);
  }
  scrollToTop(scrollToMe){

    $(document).ready(()=>{
      const config: ScrollToConfigOptions = {
        target: scrollToMe
      }

      this._scrollTo.scrollTo(config);
    })


  }

  goToLink(link:string){
    window.open(link, '_blank');
  }

  sendComment(){
    if(this.benimFirsatimLib.isAutho){
      if(this.newlyAddedComment.length > 1){
        if(!this.preventDuplicate){
          this.preventDuplicate = true;
          this.sendCommentButtonActivated = true;
          var comment:any = {};
          comment.text = this.newlyAddedComment;
          console.log(this.benimFirsatimLib.currentUser);
          comment.user = this.benimFirsatimLib.currentUser;
          comment.timeCalculation = "";
          this.newlyAddedComments.push(comment);
          this.benimFirsatimLib.createComment(this.route.snapshot.params['dealId'],null,this.newlyAddedComment).subscribe((response)=>{
            this.sendCommentButtonActivated = false;
            this.newlyAddedComment = "";

          });
          setTimeout(()=>{
            this.preventDuplicate = false;
          },10000);
        }else{
          this.snackBar.open('Spamliyorsun.Spamleme.','',{duration:3000});
        }
      }else{
        this.snackBar.open('Bir şeyler söyleyecek misin?','',{duration:3000});
      }
    }else {
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
  writeCommentSubcomment(comment,subCommentText){

    if(!this.preventDuplicate) {
      if(subCommentText.value.length > 1){
        this.preventDuplicate = true;
        comment.newlyAddedSubComments = [];
        var newlyAddedSubCommentTemp: any = {};
        newlyAddedSubCommentTemp.text = subCommentText.value;
        newlyAddedSubCommentTemp.user = this.benimFirsatimLib.currentUser;
        newlyAddedSubCommentTemp.timeCalculation = "";
        comment.newlyAddedSubComments.push(newlyAddedSubCommentTemp);
        this.benimFirsatimLib.createComment(this.route.snapshot.params['dealId'], comment.id, subCommentText.value).subscribe((response) => {
          subCommentText.value = "";
        });
        setTimeout(()=>{
          this.preventDuplicate = false;
        },10000);
      }else{
        this.snackBar.open('Bir şeyler söyleyecek misin?','',{duration:3000});
      }
    }else{
      this.snackBar.open('Spamliyorsun.Spamleme.','',{duration:3000});
    }
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
    if(this.benimFirsatimLib.isAutho){
      this.benimFirsatimLib.favDeal(this.route.snapshot.params['dealId']).subscribe((response)=>{
        this.snackBar.open('Fırsatı kaydettin','',{duration:3000});

      })
    }else{
      this.benimFirsatimLib.openSignUpPopUp.next();
    }
  }
  addSubcommentIndex(comment,index){
    if(index  === comment.comments.length ){
      comment.dahaFazlaGetirText = "HEPSİ BU KADAR :(";
    }
    comment.showUntil += 3;
  }
  whatIsPrice(price){
    try{
      if(price.indexOf(".0") === -1){
        return price ? (price + '₺') : '';
      }else{
        return price ? (price.slice(0,price.indexOf(".")) + '₺') : '';
      }
    }catch (e){

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
