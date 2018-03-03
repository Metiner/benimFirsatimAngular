import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from "rxjs/Subject";

@Injectable()
export class BenimFirsatimLibrary {
  api_address = "https://benimfirsatim.com";
  //api_address = "http://localhost:3000";


  categoryChanged = new Subject<any>();

  currentCategory = 'hot';
  private _currentPaging = 1;

  constructor(public http: Http ) {
  }

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code,pagination){

    let possible_page_codes = ['hot','rising','newcomers'];

    return this.http.get(this.api_address + '/'+page_code+'.json?page='+pagination+'&per_page=3');
  }

  public getCategories(){
    return this.http.get(this.api_address + '/deals/categories');
  }
  public changeCategory(type){
    this.currentPaging = 1;
    this.currentCategory = type;
    this.categoryChanged.next();
  }

  get currentPaging(): number {
    return this._currentPaging;
  }

  set currentPaging(value: number) {
    if(value > 0){
      this._currentPaging = value;
      //this.categoryChanged.next();
    }
  }
}
