import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subscription} from 'rxjs/Subscription';
import {
  girisYapAnimTrigger,
  kayitOlAnimTrigger,
  kayitSuccessTrigger,
  loadingBlackDivAnimationTrigger,
  signupSigninPopupAnimTrigger,
  tutorialPopupAnimTrigger
} from '../animations';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FacebookService} from 'ngx-facebook';

declare let lottie: any;
declare let gapi: any;

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
export class ContentComponent implements OnDestroy, OnInit {

  mySignUpPopUpSubscription: Subscription;
  myFeedbackPopUpSubscription: Subscription;


  auth2: any;
  email: string;
  password2: string;
  password: string;
  kayitOlAnim: any;
  tutorialAnim: any;

  kayitOlState = 'down';
  girisYapState = 'up';
  currentState = 'giris';

  f: NgForm;

  showSingUpSignInPopUp = false;
  tutorial = false;
  blackDiv = false;
  feedbackDivOpen = false;
  kayitOlBool = false;
  beniHatirlaBool = true;
  kayitOlButtonClickable = false;
  girisYapButtonClickable = false;
  showForm = true;
  kayitBasariliText = false;
  girisBasariliText = false;

  @HostListener('window:keydown', ['$event'])
    onkeyDown (ev: KeyboardEvent) {
      if (ev.key === 'Enter') {
        if (this.girisYapButtonClickable) {


          this.onGirisButtonClick();
        } else if (this.kayitOlButtonClickable) {

          this.onKayitButtonClick();
        }
      }
    }

  constructor(public benimFirsatimLib: BenimFirsatimLibrary,
              public snackBar: MatSnackBar,
              public fb: FacebookService) {

    gapi.load('auth2', function () {
      const googleAut = gapi.auth2.init({client_id: '57374298212-94cgvbkf14685g846vcq95trf50qt69v.apps.googleusercontent.com'});

    });
    this.myFeedbackPopUpSubscription = this.benimFirsatimLib.openFeedbackPopUp.subscribe(() => {
      this.blackDiv = true;
      this.feedbackDivOpen = true;
    });
    this.mySignUpPopUpSubscription = this.benimFirsatimLib.openSignUpPopUp.subscribe(
      next => {

        this.initiliaze();

        setTimeout(() => {
          this.loadAnimations();

        }, 200);
      }
    );

  }

  initiliaze(): void {
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

  ngOnInit(): void {
    // let initParams: InitParams = {
    //   appId: '1234566778',
    //   xfbml: true,
    //   version: 'v2.8'
    // };
    // this.fb.init();
  }

  ngOnDestroy(): void {
    this.mySignUpPopUpSubscription.unsubscribe();
  }

  onGirisButtonClick(): void {

    if (this.girisYapButtonClickable && this.email !== undefined && this.password !== undefined) {
      this.benimFirsatimLib.signIn(this.email, this.password).subscribe(data => {

        if (data.json() != null && data.ok === true) {
          this.benimFirsatimLib.successLogin(data.json(), 1);
          this.girisBasariliText = true;
          this.showForm = false;
          this.girisYapState = 'down';

          setTimeout(
            () => {
              this.tutorial = false;
              this.blackDiv = false;
              this.showSingUpSignInPopUp = false;
            }, 1500);
        }
      }, error => {
        this.snackBar.open('Yanlış e-mail veya parola girdiniz.', '', {duration: 3000});
      });
    } else {
        this.snackBar.open('Lütfen eksiksiz girdiğinize emin olun.', '', {duration: 3000});
    }
  }

  onKayitButtonClick(): void {

    if (this.kayitOlButtonClickable && this.password2 !== undefined && this.password !== undefined && this.email !== undefined) {
      if (this.password !== this.password2) {
        this.snackBar.open('Parolalar Uyuşmamakta', '', {duration: 3000});
      } else {
        this.benimFirsatimLib.signUp(this.email, this.password).subscribe(data => {
          if (data != null) {
            if (data.status === 200 && data.ok) {
              this.snackBar.open('Kullanıcı Yaratıldı', '', {duration: 3000});
              this.showForm = false;
              this.kayitBasariliText = true;
              this.kayitOlAnim.play();
              this.benimFirsatimLib.signIn(this.email, this.password).subscribe(data => {
                this.benimFirsatimLib.successLogin(data.json(), 1);
                setTimeout(
                  () => {
                    this.tutorial = false;
                    this.showSingUpSignInPopUp = false;
                    this.showForm = true;
                    this.blackDiv = false;

                  }, 1500);
              });
            } else if (data.json().state.code === 1) {

              this.snackBar.open(data.json().state.messages[0], '', {duration: 3000});
            }
          }
        }, error => {
          console.log(error);
          this.snackBar.open('Bu e-posta zaten mevcut', '', {duration: 3000});
        });
      }
    } else {
      this.snackBar.open('Lütfen eksiksiz girdiğinize emin olun.', '', {duration: 3000});
    }
  }

  makeSignUpButtonClickable(event): void {
    this.kayitOlButtonClickable = event.fromState === 'down' && event.toState === 'up' && event.triggerName === 'kayitOl';
  }

  makeLoginButtonClickable(event): void {
    this.girisYapButtonClickable = event.fromState === 'down' && event.toState === 'up' && event.triggerName === 'girisYap';
    if (event.fromState === 'void' && event.toState === 'up' && event.triggerName === 'girisYap') {
      this.girisYapButtonClickable = true;
    }

  }

  changeState(type): void {
    if (this.currentState !== type) {
      this.currentState = type;

      if (type === 'kayit') {
        this.beniHatirlaBool = false;
        setTimeout(() => {
          this.kayitOlBool = true;
        }, 1000);
        if (this.kayitOlState === 'up') {
          this.kayitOlState = 'down';
          this.girisYapState = 'up';
        } else {
          this.kayitOlState = 'up';
          this.girisYapState = 'down';
        }
      } else {
        this.kayitOlBool = false;
        setTimeout(() => {
          this.beniHatirlaBool = true;
        }, 1000);
        if (this.girisYapState === 'up') {
          this.girisYapState = 'down';
          this.kayitOlState = 'up';
        } else {
          this.girisYapState = 'up';
          this.kayitOlState = 'down';
        }
      }
    }
  }

  loadAnimations(): void {

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

  exitFromSignup(): void {
    this.showSingUpSignInPopUp = false;
    this.tutorial = false;
    this.blackDiv = false;
    this.feedbackDivOpen = false;
  }

  onTutorialAnimFinished(): void {
  }


  fbLogin(): void {

    this.benimFirsatimLib.oAuth(1).subscribe(response => {

      this.benimFirsatimLib.successLogin(response, 2);
      setTimeout(
        () => {
          this.tutorial = false;
          this.showSingUpSignInPopUp = false;
          this.showForm = true;
          this.blackDiv = false;

        }, 1500);
    });
  }

  onGooglePlusLogin(): void {

    this.benimFirsatimLib.oAuth(2).subscribe(response => {

      this.benimFirsatimLib.successLogin(response, 2);
      setTimeout(
        () => {
          this.tutorial = false;
          this.showSingUpSignInPopUp = false;
          this.showForm = true;
          this.blackDiv = false;

        }, 1500);
    });
  }


  onFeedbackSubmit(f: NgForm): void {
    this.blackDiv = false;
    this.feedbackDivOpen = false;
  }

}
