import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {NgForm} from '@angular/forms';
import { FacebookService, InitParams} from 'ngx-facebook';
import {Router} from '@angular/router';
import {Angular2TokenService} from 'angular2-token';

@Injectable()
export class BenimFirsatimLibrary {

  api_address = 'https://api.benimfirsatim.com';

  categoryChanged = new Subject<any>();
  openSignUpPopUp = new Subject<any>();
  openFeedbackPopUp = new Subject<any>();
  showPointTableSub = new Subject<any>();
  resetFooter = new Subject<any>();
  successLoginProfileMenuChange = new Subject<any>();
  responsiveDesign = new Subject<any>();
  searchInitializeSubject = new Subject<any>();



  showPointTable = true;

  _currentPaging = 1;
  _totalPage: number;
  _currentDeals = [];
  _categories = [];
  _justCreatedDeal: any;
  _isAutho = false;
  _currentUser: any;
  searchResult: any = {};

  currentCategory = 'hot';

  constructor(public http: Http ,
              public fb: FacebookService,
              private route: Router,
              private _tokenService: Angular2TokenService) {

    const initParams: InitParams = {
      appId: '113944349294618',
      xfbml: true,
      version: 'v2.8'
    };
    try {
      fb.init(initParams);
    } catch (e) {
      console.log(e);
    }
    if (this.silentLogin()) {
      this.registerOneSignal();
    }
  }

  registerOneSignal(): void {
    const self = this;
    const OneSignal = window['OneSignal'] || [];
    OneSignal.push(['init', {
      subdomainName: 'benimfirsatim.os.tc',
      appId: 'e3b6a1f6-1826-4015-a0c5-99665f5a9589',
      autoRegister: true,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);

    OneSignal.push(() => {

      if (self.isAutho) {
        OneSignal.sendTag('user_id', self.currentUser['id']).then((response) => {
        });
      }
    });
  }

  silentLogin(): boolean {
    if (this._tokenService.userSignedIn()) {

      const user = JSON.parse(localStorage.getItem('userBenimFirsatim'));
      this.currentUser = user;
      this.isAutho = true;
      return true;
    }
    return false;
  }

  logout(): void {
  this.isAutho = false;
  this._tokenService.signOut();
  localStorage.setItem('userBenimFirsatim', '');
  this.currentUser = {};
}

  // Page code can be,
  // 'hot','rising' or 'newcomers'
  public getPage(page_code, pagination)  {
  return this.http.get(this.api_address + '/' + page_code + '.json?page=' + pagination);
}

  public getDeal(deal_id)  {
  return this._tokenService.get('deals/0/' + deal_id);
}

  public signUp(email, password)  {
  return this._tokenService.registerAccount({
    email: email,
    password: password,
    passwordConfirmation: password
  });
}

  public signIn(email, password)  {
  return this._tokenService.signIn({
    email: email,
    password: password
  });


}

  public getCategories()  {
  return this.http.get(this.api_address + '/deals/categories');
}

  public changeCategory(type): void {
    this.route.navigate(['']);
    this.currentCategory = type;
    this.categoryChanged.next();
}

  public openSignUpPopUpFunc(): void {
  this.openSignUpPopUp.next();
}

  public openFeedbackPopUpFunc(): void {
  this.openFeedbackPopUp.next();
}

  public responsiveDesignFunc(): void {
  this.responsiveDesign.next();
}
  // Gets information from given deal link.
  public getPullMeta(url) {
  return this.http.get(this.api_address + '/deals/pull_meta?target=' + url);
}


  public updateUser(nickname, password)  {
  return this._tokenService.put('auth', {'name': nickname, 'password': password});
}

  public getComments(deal_id) {
  return this._tokenService.get('deals/' + deal_id + '/comments');
}

  public successLogin(data: any, type: number): void {
  // 2- auto auth
  if (type === 2) {
    localStorage.setItem('userBenimFirsatim', JSON.stringify(data));
    this.isAutho = true;
    this.currentUser = data;
    this.successLoginProfileMenuChange.next('success');
  } else {
    localStorage.setItem('userBenimFirsatim', JSON.stringify(data.data));
    this.isAutho = true;
    this.currentUser = data.data;
    this.successLoginProfileMenuChange.next('success');
  }

}

  public createComment(deal_id, parent_comment_id, comment)  {
  return this._tokenService.post('deals/' + deal_id + '/comments.json', {
    parent_comment_id: parent_comment_id,
    comment: comment
  });
}

  public createDeal(form: NgForm, selectedImageUrl, imageBase64)  {
  const categories = '';
  let body;
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
    starts_at: form.value.deal_date,
    price: form.value.dealPricePreview,
    category_id: form.value.selectedCategory.id,
    link: form.value.dealUrlPreview,
    image_url: selectedImageUrl,
    title: form.value.dealTitlePreview,
    details: form.value.dealDetailPreview,
    coupon_code: form.value.coupon_code,
    city: form.value.selectedCity
  };
  return this._tokenService.post('deals/create.json', body);
}


  public upVoteDeal(dealId) {
  return this._tokenService.get('deals/' + dealId + '/upvote');
}

  public downVoteDeal(dealId) {
  return this._tokenService.get('deals/' + dealId + '/downvote');
}

  public commentVote(comment_id) {
  return this._tokenService.get('comments/' + comment_id + '/vote');
}

  public getCategoryDeals(categoryIndex, pagination) {
  return this.http.get(this.api_address + '/categories/' + categoryIndex + '/deals.json?page=' + pagination);
}

  // Gets deals which created by current logged user.
  public getDealFromUser(pagination) {
  return this._tokenService.get('/user/' + this.currentUser.id + '/deals.json?page=' + pagination);
}

  public stockFinished(dealId) {
  return this.http.get(this.api_address + '/deals/' + dealId + '/stock_finished');
}

  public ended(dealId) {
  return this.http.get(this.api_address + '/deals/' + dealId + '/ended');
}

  public report(dealId) {
  return this.http.get(this.api_address + '/deals/' + dealId + '/report');
}

  public favDeal(dealId) {
  return this._tokenService.get('deals/' + dealId + '/bookmark');
}

  public getFavDeal() {
  return this._tokenService.get('me/bookmarks');
}

  public getMyComments() {
  return this._tokenService.get('me/comments');
}

  public getCommentsThatIliked()  {
  return this._tokenService.get('me/comments/liked ');
}

  public getMyReplies()  {
  return this._tokenService.get('me/comments/replied');
}

  public getUsersTop()  {
  return this.http.get(this.api_address + '/users/top');
}

  public search(searchParam)  {
  return this.http.get(this.api_address + '/search?searchparam=' + searchParam);
}

  public getTopCategories()  {
  return this.http.get(this.api_address + '/categories/top');
}

  public oAuth(type: number)  {
  if (type === 1) {
    return this._tokenService.signInOAuth('facebook');
  } else {
    return this._tokenService.signInOAuth('google_oauth2');
  }
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
    this.resetFooter.next();
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

    if (value > 0 &&  value <= this.totalPage) {
      this._currentPaging = value;
    }
  }
  set currentDeals(value: any[]) {
    this._currentDeals = value;
  }

  get justCreatedDeal(): any  {
    return this._justCreatedDeal;
  }

  set justCreatedDeal(value: any) {
    this._justCreatedDeal = value;
  }
}
