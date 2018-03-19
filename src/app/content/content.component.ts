import {Component, OnDestroy} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger, kayitOlAnimTrigger, loadingBlackDivAnimationTrigger, signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';

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
export class ContentComponent implements OnDestroy{

  showSingUpSignInPopUp = true;
  tutorial = true;
  mySignUpPopUpSubscription: Subscription;
  email:string;
  password:string;

  kayitOlState = 'down';
  girisYapState = 'up';
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
    if(type === 'kayit')
    {
      if(this.kayitOlState === 'up'){
        this.kayitOlState = 'down'
      }else {
        this.kayitOlState = 'up';
      }
    } else{
      if(this.girisYapState === 'up'){
        this.girisYapState = 'down'
      }else {
        this.girisYapState = 'up';
      }
    }

  }
}
