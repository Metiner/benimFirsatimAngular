import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger, kayitOlAnimTrigger, kayitSuccessTrigger, loadingBlackDivAnimationTrigger, signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
declare var lottie:any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [signupSigninPopupAnimTrigger,
    loadingBlackDivAnimationTrigger,
    tutorialPopupAnimTrigger,
    kayitOlAnimTrigger,
    girisYapAnimTrigger,
    kayitSuccessTrigger]
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

  showForm = true;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public snackBar: MatSnackBar) {

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

    if (this.girisYapButtonClickable) {
      console.log("giris yap cagırdi")
      this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data => {

        if (data.json() != null && data.json().success == true) {
          this.benimFirsatimLib.successLogin(data.json());
          this.tutorial = false;
          this.showSingUpSignInPopUp = false;

        }
      }, error => {
        this.snackBar.open('Yanlış e-mail veya parola girdiniz.','',{duration:3000});
      })
    }
  }
  onKayitButtonClick(form:NgForm){

    if (this.kayitOlButtonClickable) {
      console.log("kayit ol cagırdi")
      if (!form.value.password == form.value.password2) {
        this.snackBar.open('Parolalar Uyuşmamakta','',{duration:3000});
      } else {
        this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data => {
          if (data != null) {
            if (data.status == 200 && data.ok) {
              this.snackBar.open('Kullanıcı Yaratıldı','',{duration:3000});
              this.showForm = false;
              this.kayitOlAnim.play();
              //this.navCtrl.push(LoginPage);
            } else if (data.json().state.code == 1) {

              this.snackBar.open(data.json().state.messages[0],'',{duration:3000});
              form.reset();
            }
          }
        }, error => {
          console.log(error);
          this.snackBar.open('Yanlış e-mail veya parola girdiniz.','',{duration:3000});
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
