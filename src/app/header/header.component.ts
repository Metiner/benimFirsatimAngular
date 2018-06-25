
import {Component, EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {slideInOutAnimation, slideInOutAnimationSearch} from '../animations';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {Subject} from "rxjs/Subject";
import {Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
declare var $:any;

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInOutAnimation,slideInOutAnimationSearch],

})
export class HeaderComponent implements OnDestroy{

  oneCikanlarAnimConf: Object;
  yukselenlerAnimConf: Object;
  yenilerAnimConf: Object;
  categoriesAnimConf: Object;

  oneCikanlarAnim:any;
  yukselenlerAnim:any;
  yenilerAnim:any;
  categoriesAnim:any;

  categoriesAnimation = 'out';
  myProfileAnimation = 'out';
  searchDivAnimation = 'out';
  categories = [];

  public firsatEkleKucult = false;

  public _onResizeEventFlag = false;


  displayCategoriesProfileDiv = false;
  isAuth = false;

  autSubscription : Subscription;
  responsiveDesignSubscription : Subscription;

  initializeSearchDiv: boolean;

  constructor(public benimFirsatimLibrary:BenimFirsatimLibrary,
              public router:Router){


    this.initializeAnims();
    this.checkAuth();
    this.benimFirsatimLibrary.getCategories().subscribe(response=> {
      this.categories = response.json();
      this.benimFirsatimLibrary.categories = response.json();
    });
    this.autSubscription = this.benimFirsatimLibrary.successLoginProfileMenuChange.subscribe(value=>{
      if(value === 'success'){
        this.isAuth = true;
      }
    });


    this.responsiveDesignSubscription = this.benimFirsatimLibrary.responsiveDesign.subscribe(value=>{

      if(innerWidth < 1275){
        this._onResizeEventFlag = false;
      }else{
        this._onResizeEventFlag = true;
      }

      var event = {};
      this.responsiveDesign(event);

    });



    window.onresize = (event:any)=>{
      this.responsiveDesign(event);
    }


  }

  ngOnDestroy(){
    this.autSubscription.unsubscribe();
  }

  responsiveDesign(event){


    $(document).ready(()=>{


    let innerWidthToCheck;

    if(event.srcElement === undefined){
      innerWidthToCheck = innerWidth;
    }else{
      innerWidthToCheck = event.srcElement.window.innerWidth;
    }

    if(innerWidthToCheck <1475){

      $('.col-to-1').removeClass('col-2');
      $('.col-to-1').addClass('col-auto');

    }else{
      $('.col-to-1').removeClass('col-auto');
      $('.col-to-1').addClass('col-2');
    }

    if(innerWidthToCheck < 1020){

      $('.categories-margin-responsive').addClass('categories-margin-responsive-added');
      $('.dealTitleAndUserRow').addClass('text-center');

      $('.col-kucuk-responsive').removeClass('col-3');
      $('.col-kucuk-responsive').addClass('col');
      $('.col-kucuk-responsive').removeClass('margin-right-20px');
      $('.col-kucuk-responsive').addClass('margin-bottom-20px');
    }else{


      $('.categories-margin-responsive').removeClass('categories-margin-responsive-added');
      $('.col-kucuk-responsive').addClass('col-3');
      $('.col-kucuk-responsive').removeClass('col');
      $('.col-kucuk-responsive').addClass('margin-bottom-20px');
      $('.col-kucuk-responsive').addClass('margin-right-20px');

    }
    if(innerWidthToCheck < 970){
      $('.user-info').addClass('margin-lef-minus-30px');
    }else{
      $('.user-info').removeClass('margin-lef-minus-30px');
    }
    if(innerWidthToCheck < 1275){

      if(innerWidthToCheck < 970){
        $('.tabLow').addClass('tabLowBuyuk');
      }else{
        $('.tabLow').removeClass('tabLowBuyuk');
      }

      this.firsatEkleKucult = true;
      $('.font-class').addClass('font-size');
      $('.footer-col').addClass('mx-auto');

      //PROFILE SETTINGS RESPONSIVENESS
      $('.user-name').addClass('user-name-kucuk');
      $('.tab').addClass('tab-kucuk');


      if(!this._onResizeEventFlag){

        $('#for-responsiveness').addClass('col');
        $('#for-responsiveness').removeClass('col-8');

        $('#for-responsiveness-singleDeal').addClass('col');
        $('#for-responsiveness-singleDeal').removeClass('col-8');


        this._onResizeEventFlag = true;
        this.benimFirsatimLibrary.showPointTableSub.next(false);
      }
    }else{
      this.firsatEkleKucult = false;

     $('.tabLow').addClass('tabLowBuyuk');

      //PROFILE SETTINGS RESPONSIVENESS
      $('.user-name').removeClass('user-name-kucuk');
      $('.tab').removeClass('tab-kucuk');


      if(this._onResizeEventFlag){
        $('#for-responsiveness').removeClass('col');
        $('#for-responsiveness').addClass('col-8');


        $('#for-responsiveness-singleDeal').addClass('col-8');
        $('#for-responsiveness-singleDeal').removeClass('col');


        this._onResizeEventFlag = false;
        if(this.benimFirsatimLibrary.showPointTable){
          this.benimFirsatimLibrary.showPointTableSub.next(true);
        }
      }
      $('.font-class').removeClass('font-size');
      $('.footer-col').removeClass('mx-auto');



      if(innerWidthToCheck > 1000){
        $('.dealTitleAndUserRow').removeClass('text-center');
      }
    }
    })
  }

  checkAuth(){
    this.isAuth = this.benimFirsatimLibrary.isAutho;
  }
  goToSignUpAndSignin(){
    this.benimFirsatimLibrary.openSignUpPopUpFunc();
  }
  initializeAnims() {
    this.oneCikanlarAnimConf = {
      path: 'assets/animations/one_cikanlar_anim.json',
      autoplay: false,
      loop: true
    };
    this.yukselenlerAnimConf = {
      path: 'assets/animations/yukselenler_anim.json',
      autoplay: false,
      loop: true
    };
    this.yenilerAnimConf = {
      path: 'assets/animations/yeniler_anim.json',
      autoplay: false,
      loop: true
    };
    this.categoriesAnimConf = {
      path: 'assets/animations/categories.json',
      autoplay: false,
      loop: true
    };
  }
  createAnim(anim,type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim = anim;
        break;
      case 2:
        this.yukselenlerAnim = anim;
        break;
      case 3:
        this.yenilerAnim = anim;
        break;
      case 4:
        this.categoriesAnim = anim;
        break;
    }
  }
  playAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.play();
        break;
      case 2:
        this.yukselenlerAnim.play();
        break;
      case 3:
        this.yenilerAnim.play();
        break;
      case 4:
        this.categoriesAnim.play();
        break;
    }
  }
  pauseAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.pause();
        break;
      case 2:
        this.yukselenlerAnim.pause();
        break;
      case 3:
        this.yenilerAnim.pause();
        break;
      case 4:
        this.categoriesAnim.pause();
        break;
    }
  }
  stopAnim(type){
    // type
    // 1- onceCikanlar
    // 2 - yukselenler
    // 3 - yeniler
    // 4- kategoriler

    switch (type){
      case 1:
        this.oneCikanlarAnim.stop();
        break;
      case 2:
        this.yukselenlerAnim.stop();
        break;
      case 3:
        this.yenilerAnim.stop();
        break;
      case 4:
        this.categoriesAnim.stop();
        break;
    }
  }
  slideDiv(type,state,displayCategoriesProfileDivBoolean){

    this.displayCategoriesProfileDiv = displayCategoriesProfileDivBoolean;

    switch (type) {
      case 'categories':
        setTimeout(() => {
          this.categoriesAnimation = state;
        }, 100)
        break;
      case 'profile':
        setTimeout(() => {
          this.myProfileAnimation = state;
        }, 100)
        break;
    }
  }
  onCategoryChange(type){
    this.benimFirsatimLibrary.showPointTable = true;
    this.benimFirsatimLibrary.currentPaging = 1;
    this.benimFirsatimLibrary.totalPage = 2;
    this.benimFirsatimLibrary.changeCategory(type);
  }
  getCategoryIcon(categoryId){
    var src = "";
    switch (categoryId){
      case 1:
        src = 'assets/svgs/categoryIconSvgs/aile_cocuk_icon.svg';
        break;
      case 12:
        src = 'assets/svgs/categoryIconSvgs/mobilya_icon.svg';
        break;
      case 18:
          src = 'assets/svgs/categoryIconSvgs/spor_fitness_icon.svg';
        break;
      case 21:
          src = 'assets/svgs/categoryIconSvgs/yazilim_icon.svg';
        break;
      case 13:
        src = 'assets/svgs/categoryIconSvgs/mode_tekstil_icon.svg';
        break;
      case 3:
        src = 'assets/svgs/categoryIconSvgs/bilgisayar_icon.svg';
        break;
      case 6:
        src = 'assets/svgs/categoryIconSvgs/eglence_icon.svg';
        break;
      case 10:
        src = 'assets/svgs/categoryIconSvgs/freebies_icon.svg';
        break;
      case 15:
        src = 'assets/svgs/categoryIconSvgs/ofis_kirtasiye.svg';
        break;
      case 2:
        src = 'assets/svgs/categoryIconSvgs/beyaz_esya_icon.svg';
        break;
      case 4:
        src = 'assets/svgs/categoryIconSvgs/ceptelefonu_icon.svg';
        break;
      case 14:
        src = 'assets/svgs/categoryIconSvgs/music_icon.svg';
        break;
      case 16:
        src = 'assets/svgs/categoryIconSvgs/otomobil_aksesuarlari_icon.svg';
        break;
      case 19:
        src = 'assets/svgs/categoryIconSvgs/taki_aksesuar_icon.svg';
        break;
      case 17:
        src = 'assets/svgs/categoryIconSvgs/saglik_kisisel_bakim_icon.svg';
        break;
      case 7:
        src = 'assets/svgs/categoryIconSvgs/elektronik_icon.svg';
        break;
      case 8:
        src = 'assets/svgs/categoryIconSvgs/ev_bahce.svg';
        break;
      case 9:
        src = 'assets/svgs/categoryIconSvgs/finansal_hizmetler_icon.svg';
        break;
      case 11:
        src = 'assets/svgs/categoryIconSvgs/gida_icon.svg';
        break;
      case 20:
        src = 'assets/svgs/categoryIconSvgs/tatil_kampcilik_icon.svg';
        break;
      case 22:
        src = 'assets/svgs/categoryIconSvgs/diger_icon.svg';
        break;
      case 5:
        src = 'assets/svgs/categoryIconSvgs/cinden_icon.svg';
        break;
    }
    return src;
  }
  onCreateNewDeal(){
    if(this.benimFirsatimLibrary.isAutho){
      this.router.navigate(['createNewDeal']);
    }else{
      this.benimFirsatimLibrary.openSignUpPopUp.next();
    }
  }
  logout(){
    this.isAuth = false;
    this.benimFirsatimLibrary.isAutho = false;
    localStorage.clear();
    this.benimFirsatimLibrary.currentUser = {};
    this.onCategoryChange('hot');
  }
  onMyDealsPage(){
    this.router.navigate(['/myProfile/myDeals']);
  }
  onSettingsPage(){
    this.router.navigate(['/myProfile/settings']);
  }
  onNotifications(){
    this.router.navigate(['/myProfile/notifications']);
  }
  onSearchEvent(event){

    if(event.key === 'Enter'){

      this.benimFirsatimLibrary.search(event.path[0].value).subscribe(response => {
        this.benimFirsatimLibrary.searchResult = response.json();
        this.initializeSearchDiv = false;
        this.onCategoryChange('search');

      });
      /*if(event.key === 'Backspace'){
        this.searchParam = this.searchParam.slice(0,-1);
        if(event.srcElement.value.length === 0){
          this.searchParam = "";
          this.searchDivAnimation = 'out';
        }
      }
      if(event.key.length < 2){
        this.searchParam += event.key;

        }
      }*/
    }
    if(event.key === 'Escape'){
      this.initializeSearchDiv = false;
    }
  }
  goToDeal(dealId) {
    var searchInput:any = document.getElementsByClassName("search");
    searchInput[0].value = "";
    this.searchDivAnimation = 'out';
    this.router.navigate(['/deal/' + dealId]);
  }
  whatIsPrice(deal){
    try {

      if(deal.price.indexOf(".0") === -1){
        return deal.price ? (deal.price + '₺') : '';
      }else{
        return deal.price ? (deal.price.slice(0,deal.price.indexOf(".")) + '₺') : '';
      }
    }catch (e)
    {

    }
  }

  onFeedback(){
    this.router.navigate(["feedback"]);
  }

  onSearchIcon(){
    this.initializeSearchDiv = true;

    setTimeout(()=>{
      document.getElementById("myInput").focus();
    },500)
  }


}
