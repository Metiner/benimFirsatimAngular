import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {NgForm} from '@angular/forms';

@Injectable()
export class BenimFirsatimLibrary {
  //api_address = "https://benimfirsatim.com";
  //api_address = "http://localhost:3000";
  api_address = "https://app-b7b3c182-2419-47ad-a597-caf24ce3f70c.cleverapps.io";


  categoryChanged = new Subject<any>();
  openSignUpPopUp = new Subject<any>();
  successLoginProfileMenuChange = new Subject<any>();
  private _dealAnimationContinues = true;

  currentCategory = 'hot';
  private _currentPaging = 1;
  private _totalPage:number;
  private _currentDeals = [];
  private _categories =[];

  private _isAutho = false;
  private _currentUser:any;

  constructor(public http: Http ) {
    this.silentLogin();
  }

  silentLogin(){
    if(localStorage.getItem("user") !== null){
      let user = JSON.parse(localStorage.getItem("user"));
      this.currentUser = user;
      this.isAutho = true;
    }
  }
  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code,pagination){
    return this.http.get(this.api_address + '/'+page_code+'.json?page='+pagination);
  }

  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users', {"user":{"email":email,"password":password}});
  }
  public signupOrLogin(email,name,avatar_url,uid,authResponse,provider_name){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/users/auto_oauth',{"email":email,"name":name,"avatar_url":avatar_url,"uid":uid,"provider":provider_name,login_data:authResponse},opt);
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    // myHeaders.set('Authorization',BenimfirsatimLib.token);

    // opt = new RequestOptions({
    //   headers:myHeaders
    // });

    return opt;
  }

  public signIn(email,password){
    console.log(email,password);
    return this.http.post(this.api_address + '/users/sign_in.json',{"user":{"email":email,"password":password}});
  }

  public getCategories(){
    return this.http.get(this.api_address + '/deals/categories');
  }
  public changeCategory(type){
    console.log(this.dealAnimationContinues);
    if(!this.dealAnimationContinues){
      if(this.currentPaging <= this.totalPage){
        this.currentCategory = type;
        this.categoryChanged.next();
      }
    }

  }
  public openSignUpPopUpFunc(){
    this.openSignUpPopUp.next();
  }
  //Gets information from given deal link.
  public getPullMeta(url){
    return this.http.get(this.api_address + '/deals/pull_meta?target=' + url);
  }
  getDealById(id:string){
    for(let i=0;i<this.currentDeals.length;i++){
      if(this.currentDeals[i].id == id)
        return this.currentDeals[i];
    }
  }

  public getComments(deal_id){
    return this.http.get(this.api_address + '/deals/'+deal_id+'/comments');
  }

  public successLogin(data:any){
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
    this.isAutho = true;
    this.currentUser = data.user;
    this.successLoginProfileMenuChange.next("success");
  }
  public createComment(deal_id,parent_comment_id,comment){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/deals/' + deal_id +'/comments.json',{parent_comment_id:parent_comment_id,comment:comment},opt);
  }

  public createDeal(form:NgForm,selectedImageUrl,imageBase64){
    let opt = this.setHeader();
    let categories = '';
    let body;
    console.log(form.value);
    // if(selectedImageUrl == 'photoTaken'){
    //   body = {starts_at:form.value.deal_date,
    //     price:form.value.deal_price,
    //     categories: form.value.selectedCategory[0],
    //     image_64:imageBase64,
    //     link:form.value.deal_url,
    //     title:form.value.deal_title,
    //     details:form.value.deal_details,
    //     coupon_code:form.value.deal_coupon_code,
    //     city:form.value.selectedCity};
    // }
    // else{
      body = {
        starts_at:form.value.deal_date,
        price:form.value.dealPrice,
        categories: form.value.selectedCategory,
        link:form.value.dealUrl,
        image_url:selectedImageUrl,
        title:form.value.dealTitle,
        details:form.value.dealDetail,
        coupon_code:form.value.coupon_code,
        city:form.value.selectedCity};


    return this.http.post(this.api_address + '/deals/create.json',body,opt);
  }

  public commentVote(comment_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/comments/'+comment_id+'/vote',{},opt);
  }

  get isAutho(): boolean {
    return this._isAutho;
  }

  set isAutho(value: boolean) {
    this._isAutho = value;
  }


  get categories(): any[] {
    return this._categories;
  }

  set categories(value: any[]) {
    this._categories = value;
  }

  get totalPage(): number {
    return this._totalPage;
  }

  set totalPage(value: number) {
    this._totalPage = value;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  set currentUser(value: any) {
    this._currentUser = value;
  }

  get currentPaging(): number {
    return this._currentPaging;
  }

  set currentPaging(value: number) {

    if(value > 0 && !this.dealAnimationContinues){
      this._currentPaging = value;
    }
  }
  get dealAnimationContinues(): boolean {
    return this._dealAnimationContinues;
  }

  set dealAnimationContinues(value: boolean) {
    this._dealAnimationContinues = value;
  }


  get currentDeals(): any[] {
    return this._currentDeals;
  }

  set currentDeals(value: any[]) {
    this._currentDeals = value;
  }
}
