import {Component, OnInit, ViewChild} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {dealAvatarSelectionTrigger, highlightTrigger, loadingBlackDivAnimationTrigger, showMeTrigger} from '../animations';
import {MatDatepickerInputEvent, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {NgForm} from '@angular/forms';
declare var $:any;
declare var lottie:any;
@Component({
  selector: 'app-create-new-deal',
  templateUrl: './create-new-deal.component.html',
  styleUrls: ['./create-new-deal.component.scss'],
  animations: [showMeTrigger,dealAvatarSelectionTrigger,loadingBlackDivAnimationTrigger,highlightTrigger]
})
export class CreateNewDealComponent implements OnInit {

  @ViewChild('allCategories') allCategories:any;
  @ViewChild('allImages') allImages:any;

  dealUrl:string = "";
  dealTitle:string= "";
  dealPrice:string= "";
  dealDetail:string= "";
  dealOwner:string= "";
  dealOwnerAvatar:string= "";

  currentDate:string= "";

  images : any[] = [];

  states=["Yozgat","Yozgat","Yozgat"];

  isLinkEmpty: boolean = true;

  showProgressBar = false;

  selectedImageSrc = "../../assets/imgs/firsat_gorseli_unselected@3x.png";

  createDealAnimation:any;

  selectedCategory:string = "";
  categories = [{'id':14,'name':'Bilgisayar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.333Z','updated_at':'2017-12-12T10:43:18.333Z'},{'id':17,'name':'Ev Gereçleri','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:02:49.897Z','updated_at':'2018-01-06T20:02:49.897Z'},{'id':1,'name':'Moda \u0026 Aksesuarlar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-12T23:40:35.480Z','updated_at':'2017-11-12T23:40:35.480Z'},{'id':15,'name':'Yeme \u0026 İçme','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.682Z','updated_at':'2017-12-12T10:43:18.682Z'},{'id':2,'name':'Cep Telefonu','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-13T09:28:37.551Z','updated_at':'2017-11-13T09:28:37.551Z'},{'id':6,'name':'Müzik','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-18T20:41:29.809Z','updated_at':'2017-11-18T20:41:29.809Z'},{'id':13,'name':'Eğlence','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.532Z','updated_at':'2017-11-28T23:24:12.532Z'},{'id':5,'name':'Yazılım','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-14T15:42:38.043Z','updated_at':'2017-11-14T15:42:38.043Z'},{'id':11,'name':'Mutfak Aleti','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.509Z','updated_at':'2017-11-28T23:24:12.509Z'},{'id':10,'name':'Ev Aleti','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.402Z','updated_at':'2017-11-28T23:24:12.402Z'},{'id':3,'name':'Elektronik','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-13T09:28:37.582Z','updated_at':'2017-11-13T09:28:37.582Z'},{'id':20,'name':'Diğer','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-07T10:56:12.291Z','updated_at':'2018-01-07T10:56:12.291Z'},{'id':4,'name':'Mobilya','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-14T15:42:38.029Z','updated_at':'2017-11-14T15:42:38.029Z'},{'id':16,'name':'Tatil \u0026 Gezi','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.874Z','updated_at':'2017-12-12T10:43:18.874Z'},{'id':19,'name':'Freebies','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:07:21.451Z','updated_at':'2018-01-06T20:07:21.451Z'},{'id':18,'name':'Çinden Fırsatlar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:05:55.103Z','updated_at':'2018-01-06T20:05:55.103Z'},{'id':12,'name':'Güzellik \u0026 Kişisel Bakım','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.520Z','updated_at':'2017-11-28T23:24:12.520Z'}];



  constructor(public benimFirsatimlib: BenimFirsatimLibrary,
              public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.loadAnimations();
    //this.categories = this.benimFirsatimlib.categories;
    $(document).ready(function() {

      $('.bxslider').bxSlider({
        autoControls: true,
        stopAutoOnClick: true,
        speed : 1000,
        slideWidth: 200,
        minSlides:3,
        maxSlides:3,
        touchEnabled:false,
        pager : false,
        easing : 'ease-in-out'
      });
    });
    this.fillImagesArrayWithDefaultImages();

  }

// it fills the array with default images.
  fillImagesArrayWithDefaultImages(){
    for(let i=0;i<4;i++){
      this.images.push('../../assets/imgs/firsat_gorseli_unselected@3x.png');
    }
  }

  showMe(element){

    const arr = this.allCategories.nativeElement.children;
    this.selectedCategory = element.innerText;

    for(let i=0;i<arr.length;i++){
      if(arr[i] != element)
      arr[i].show = 'notShow';
    }

    if(element.show == 'show'){
     element.show = 'notShow';
    }
    else {
     element.show = 'show';
    }
  }

  loadAnimations(){
    this.createDealAnimation = lottie.loadAnimation({
      container: document.getElementById("createDealAnim"), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/firsati_yarat.json' // the path to the animation json
    });
  }

  selectMe(element){
    this.selectedImageSrc = element.src;
    const arr = this.allImages.nativeElement.children;
    for(let i=0;i<arr.length;i++){
      if(arr[i] != element)
        arr[i].children[0].select = 'unSelected';
    }

    if(element.select == 'selected'){
      element.select = 'unSelected';
    }
    else {
      element.select= 'selected';
    }
  }
  concatGivenString(element:string,sliceFrom:number){
    if(element.length > sliceFrom){
      return element.slice(0,sliceFrom).concat('...');
    }else {
      return element;
    }
  }

  playSegments(from,to){
    this.createDealAnimation
      .playSegments([from,to],true);
  }

  playAnim(){
    this.createDealAnimation.play();
  }
  stopAnim(){
    this.createDealAnimation.stop();
  }
  // it replaces title,images,description of deals with given link.
  onUrlChangeWithGivenLink(event){
    this.dealUrl = event.target.value;
    if(this.isLinkEmpty){
      this.showProgressBar = true;

      this.benimFirsatimlib.getPullMeta(event.target.value).subscribe(response=>{

        console.log(response.json());
        if(!response.json().hasOwnProperty("errors") && response.json().best_image != null && response.json().other_images != []){
          this.images =[];
          this.images.push(response.json().best_image);
          for(var i=0;i<response.json().other_images.length;i++){
            if(this.images.length < 5){
              this.images.push(response.json().other_images[i][0]);
            }
          }
          this.dealTitle = this.concatGivenString(response.json().title,68);
          this.dealDetail = this.concatGivenString(response.json().description,200);
          this.showProgressBar = false;
        }else{
          this.showProgressBar = false;
          this.snackBar.open('Lütfen girdiğiniz linki kontrol edin.','',{duration:3000});
        }
      },error2 => {
        this.showProgressBar = false;
        this.snackBar.open('Lütfen girdiğiniz linki kontrol edin.','',{duration:3000});
        console.log(error2.toLocaleString());
      })
    }
    if(event.target.value == ''){
      this.isLinkEmpty = true;
    }else
    {
      this.isLinkEmpty = false;
    }
  }



  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  onPriceChange(event){
    this.dealPrice = event.target.value;
  }
  onTitleChange(event){
    this.dealTitle = event.target.value;
  }
  onDetailChange(event){
    this.dealDetail = event.target.value;
  }

  onSubmit(form:NgForm,dealUrl,dealDetail,dealPrice,baslangicTarihi,dealCategory,dealTitle){
    if(form.value.dealUrl == ''){
      dealUrl.highlight = 'highlighted' ;
    }else{
      dealUrl.highlight = 'none' ;
    }
    if(form.value.dealDetail == ''){
      dealDetail.highlight = 'highlighted' ;
    }else{
      dealDetail.highlight = 'none' ;
    }
    if(form.value.dealPrice == ''){
      dealPrice.highlight = 'highlighted' ;
    }else{
      dealPrice.highlight = 'none' ;
    }
    if(form.value.dealDate == ''){
      baslangicTarihi.highlight = 'highlighted' ;
    }else{
      var date = form.value.dealDate.toLocaleDateString().replace('.','/').replace('.','/');
    }

    if(form.value.dealTitle == ''){
      dealTitle.highlight = 'highlighted' ;
    }else{
      dealTitle.highlight = 'none' ;
    }

    if(this.selectedCategory == ''){
      console.log("girdi amk");
      dealCategory.highlight = 'highlighted' ;
    }else{
      dealCategory.highlight = 'none' ;
    }

    form.value.deal_date = date;
    // Warn if user doesnt select any image for deal.
    if(this.selectedImageSrc == '../../assets/imgs/firsat_gorseli_unselected@3x.png'){
      this.snackBar.open('Lütfen bir görsel seçin.','',{duration:3000});
    }
  //   else{
  //     form.value.selectedCategory = this.selectedCategory;
  //     this.benimFirsatimlib.createDeal(form,this.selectedImageSrc,"").subscribe(response=>{
  //       console.log(response);
  //       console.log(response.json());
  //
  //       if(response.ok){
  //         this.showProgressBar = true;
  //       }
  //       else{
  //         this.snackBar.open(response.statusText,'',{duration:3000});
  //       }
  //     },error=>{
  //       this.snackBar.open(error.toLocaleString(),'',{duration:3000});
  //     })
  //   }
  }
}
