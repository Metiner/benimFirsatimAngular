import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger, kayitOlAnimTrigger, loadingBlackDivAnimationTrigger, signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';
import {NgForm} from '@angular/forms';
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

  showSingUpSignInPopUp = false;
  tutorial = false;
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
  tutorialAnim:any;

  kayitOlButtonClickable = false;
  girisYapButtonClickable = false;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary) {

    this.mySignUpPopUpSubscription = this.benimFirsatimLib.openSignUpPopUp.subscribe(
      next =>{
        setTimeout(()=>{
          this.loadAnimations();

        },1000)
        this.tutorial = true;
        setTimeout(()=>{
          this.showSingUpSignInPopUp = true;

        },200)
      }
    );
  }

  ngOnInit(){

  }
  ngOnDestroy() {
    this.mySignUpPopUpSubscription.unsubscribe();
  }

  onGirisButtonClick(form:NgForm) {

    console.log("giris yap" +this.girisYapButtonClickable)
    if (this.girisYapButtonClickable) {
      this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data => {

        if (data.json() != null && data.json().success == true) {
          this.benimFirsatimLib.successLogin(data.json());
          this.tutorial = false;
          this.showSingUpSignInPopUp = false;

        }
      }, error => {
        console.log(error);
        //this.benimFirsatimLib.showAlert(" ","Yanlış e-mail veya parola girdiniz.",["Tamam"]);
      })
    }
  }
  onKayitButtonClick(form:NgForm){

    console.log("kayit ol" +this.kayitOlButtonClickable)
    if (this.kayitOlButtonClickable) {
      if (!form.value.password == form.value.password2) {
        //this.benimFirsatimLib.showToast("Parolalar uyuşmamakta",3000,"bottom");
      } else {
        this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data => {
          if (data.json != null) {
            if (data.json() != null && data.json().state.code == 0) {
              //this.benimFirsatimLib.showToast("Kullanıcı oluşturuldu",3000,"bottom");
              //this.navCtrl.push(LoginPage);
            } else if (data.json().state.code == 1) {
              //this.benimFirsatimLib.showToast(data.json().state.messages[0],3500,"bottom");
              form.reset();
            }
          }
        }, error => {
          console.log(error);
          //this.benimFirsatimLib.showAlert("",error,["Tamam"]);
          // });
        });
      }
    }
  }

  makeSignUpButtonClickable(event){
    if(event.fromState === 'down' && event.toState === 'up' && event.triggerName === 'kayitOl'){
      this.kayitOlButtonClickable = true;

    }else{
      this.kayitOlButtonClickable = false;
    }
 }
  makeLoginButtonClickable(event){
    if(event.fromState === 'down' && event.toState === 'up' && event.triggerName === 'girisYap'){
    this.girisYapButtonClickable = true;

    }else {
      this.girisYapButtonClickable = false;
    }
    if(event.fromState === 'void' && event.toState === 'up' && event.triggerName === 'girisYap')
      this.girisYapButtonClickable = true;

  }
  changeState(type){
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
    this.tutorialAnim = lottie.loadAnimation({
      container: document.getElementById('tutorialAnim'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/animations/signup_panel_info.json' // the path to the animation json
    });
  }

}
