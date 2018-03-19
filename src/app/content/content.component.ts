import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger, kayitOlAnimTrigger, loadingBlackDivAnimationTrigger, signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';
declare var lottie:any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [signupSigninPopupAnimTrigger,
    loadingBlackDivAnimationTrigger,
    tutorialPopupAnimTrigger,
    kayitOlAnimTrigger,
    girisYapAnimTrigger ]
})
export class ContentComponent implements OnDestroy,OnInit{

  showSingUpSignInPopUp = true;
  tutorial = true;
  mySignUpPopUpSubscription: Subscription;
  email:string;
  password:string;
  password2:string;

  kayitOlState = 'down';
  girisYapState = 'up';
  currentState = 'giris';
  kayitOlBool = false;
  beniHatirlaBool = true;

  kayitOlAnim:any;
  constructor(public benimFirsatimLib: BenimFirsatimLibrary) {

    this.mySignUpPopUpSubscription = this.benimFirsatimLib.openSignUpPopUp.subscribe(
      next =>{
        this.tutorial = true;
        setTimeout(()=>{
          this.showSingUpSignInPopUp = true;

        },200)
      }
    );
  }

  ngOnInit(){
    setTimeout(()=>{
      this.loadAnimations();

    },1000)
  }
  ngOnDestroy() {
    this.mySignUpPopUpSubscription.unsubscribe();
  }

  onEmailChange(event){
    this.email = event.target.value;

  }
  onPasswordChange(event){
    this.password = event.target.value;
  }

  changeState(type){

    console.log(type);
    if(this.currentState !== type){
      this.currentState = type;
      if(type === 'kayit')
      {
        this.beniHatirlaBool = false;
        setTimeout(()=>{
          this.kayitOlBool = true;
        },1000)
        if(this.kayitOlState === 'up'){
          this.kayitOlState = 'down'
          this.girisYapState = 'up'
        }else {
          this.kayitOlState = 'up';
          this.girisYapState = 'down'
        }
      } else{
          this.kayitOlBool = false;
        setTimeout(()=>{
          this.beniHatirlaBool = true;
        },1000)
        if(this.girisYapState === 'up'){
          this.girisYapState = 'down'
          this.kayitOlState = 'up'
        }else {
          this.girisYapState = 'up';
          this.kayitOlState = 'down'
        }
      }
    }else{
      if(type === 'kayit'){
        console.log(type)
        this.kayitOlAnim.play();
      }
    }
  }
  loadAnimations(){
    this.kayitOlAnim = lottie.loadAnimation({
      container: document.getElementById('kayitOlAnim'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/kayit_ol_tick.json' // the path to the animation json
    });
  }

}
