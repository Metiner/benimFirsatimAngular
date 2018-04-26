import {Component, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger, kayitOlAnimTrigger, kayitSuccessTrigger, loadingBlackDivAnimationTrigger, signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FacebookService} from "ngx-facebook";
declare var lottie:any;
declare var gapi:any;
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
  public auth2: any;
  showSingUpSignInPopUp = false;
  tutorial = false;
  blackDiv = false;
  feedbackDivOpen = false;
  mySignUpPopUpSubscription: Subscription;
  myFeedbackPopUpSubscription: Subscription;
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
  kayitBasariliText = false;
  girisBasariliText = false;

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public snackBar: MatSnackBar,
              public fb: FacebookService) {

    gapi.load('auth2', function() {
      const googleAut = gapi.auth2.init({client_id :'57374298212-94cgvbkf14685g846vcq95trf50qt69v.apps.googleusercontent.com'});

      console.log(googleAut);
    });
    this.myFeedbackPopUpSubscription = this.benimFirsatimLib.openFeedbackPopUp.subscribe(()=>{
      this.blackDiv = true;
      this.feedbackDivOpen = true;
    })
    this.mySignUpPopUpSubscription = this.benimFirsatimLib.openSignUpPopUp.subscribe(
      next =>{

        this.initiliaze();

        setTimeout(()=>{
          this.loadAnimations();

        },200)
      }
    );

  }

  initiliaze(){
    this.tutorial = true;
    this.blackDiv = true;
    this.showSingUpSignInPopUp = true;
    this.kayitOlState = 'down';
    this.girisYapState = 'up';
    this.currentState = 'giris';
    this.kayitOlBool = false;
    this.beniHatirlaBool = true;
    this.kayitOlButtonClickable = false;
    this.girisYapButtonClickable = false;
    this.kayitBasariliText = false;
    this.girisBasariliText = false;
    this.showForm = true;
  }
  ngOnInit(){
    // let initParams: InitParams = {
    //   appId: '1234566778',
    //   xfbml: true,
    //   version: 'v2.8'
    // };
    // this.fb.init();
  }
  ngOnDestroy() {
    this.mySignUpPopUpSubscription.unsubscribe();
  }

  onGirisButtonClick(form:NgForm) {

    if (this.girisYapButtonClickable) {
      this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data => {

        if (data.json() != null && data.json().success == true) {
          this.benimFirsatimLib.successLogin(data.json());
          this.girisBasariliText = true;
          this.showForm = false;
          this.girisYapState = 'down';

          setTimeout(
            ()=>{
              this.tutorial = false;
              this.showSingUpSignInPopUp = false;
            },1500);
        }
      }, error => {
        this.snackBar.open('Yanlış e-mail veya parola girdiniz.','',{duration:3000});
      });
    }
  }
  onKayitButtonClick(form:NgForm){

    if (this.kayitOlButtonClickable) {
      if (form.value.password !== form.value.password2) {
        this.snackBar.open('Parolalar Uyuşmamakta','',{duration:3000});
      } else {
        this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data => {
          if (data != null) {
            if (data.status == 200 && data.ok) {
              this.snackBar.open('Kullanıcı Yaratıldı','',{duration:3000});
              this.showForm = false;
              this.kayitBasariliText = true;
              this.kayitOlAnim.play();
              this.benimFirsatimLib.signIn(form.value.email,form.value.password).subscribe(data=>{
                this.benimFirsatimLib.successLogin(data.json());
                setTimeout(
                  ()=>{
                    this.tutorial = false;
                    this.showSingUpSignInPopUp = false;
                    this.showForm = true;
                  },1500);
              });
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

    this.tutorialAnim = lottie.loadAnimation({
      container: document.getElementById('tutorialAnim'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/animations/signup_panel_info.json' // the path to the animation json
    });
    this.kayitOlAnim = lottie.loadAnimation({
      container: document.getElementById('kayitOlAnim'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/kayit_ol_tick.json' // the path to the animation json
    });
  }

  exitFromSignup(){
    this.showSingUpSignInPopUp = false;
    this.tutorial = false;
    this.blackDiv = false;
  }
  onTutorialAnimFinished(){
  }


  fbLogin(){

     this.fb.login({scope:'email'})
       .then(res =>{

           var fbValues = "fields=id,name,picture,email";
           var authResponse= res.authResponse;

           this.fb.api("me?"+ fbValues).then(response=>{
             console.log(response);
             let email = response.email
             let name = response.name;
             let id = response.id;
             let picture = response.picture.data.url;
             this.benimFirsatimLib.signupOrLogin(email,name,picture,id,authResponse,"facebook").subscribe(response=>{
                console.log(response);
               // It means, email is already being used by another user.
               if(!response.json().success){
                 this.snackBar.open('Bir sıkıntı oldu :(','',{duration:3000});

               }
               if(response.json() != null && response.json().success == true ) {

                 this.benimFirsatimLib.successLogin(response.json());
                 setTimeout(
                   ()=>{
                     this.tutorial = false;
                     this.showSingUpSignInPopUp = false;
                     this.showForm = true;
                   },1500);

              }
            }, error=>{
               this.snackBar.open(error.toLocaleString(),'',{duration:3000});
             })
          });
        },

      )
      .catch(e => console.log('Error logging into Facebook', e));
  }

   onGooglePlusLogin(){
     let googleAuth = gapi.auth2.getAuthInstance();
     googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {

         console.log(googleUser);
         var loginData = {accessToken:googleUser.getAuthResponse().access_token};
         var email = googleUser.getBasicProfile().U3;
         var name = googleUser.getBasicProfile().U3.split('@')[0];
         var picture = googleUser.getBasicProfile().Paa;
         var id = googleUser.getBasicProfile().Eea;

         this.benimFirsatimLib.signupOrLogin(email,name,picture,id,loginData,"google").subscribe(response=>{
           console.log(response.json())
           this.benimFirsatimLib.successLogin(response.json());
           setTimeout(
             ()=>{
               this.tutorial = false;
               this.showSingUpSignInPopUp = false;
               this.showForm = true;
             },1500);
         });

       });
     });
   }

}
