import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from "rxjs/Subject";

@Injectable()
export class BenimFirsatimLibrary {
  api_address = "https://benimfirsatim.com";
  //api_address = "http://localhost:3000";


  categoryChanged = new Subject<string>();

  constructor(public http: Http ) {
  }

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code,pagination){
    //let opt = this.setHeader();
    let possible_page_codes = ['hot','rising','newcomers'];

    /*if(possible_page_codes.indexOf(page_code)=== -1){
      return;
    }*/
    return this.http.get(this.api_address + '/'+page_code+'.json?page='+pagination+'&per_page=3');
  }

  public getCategories(){
    return this.http.get(this.api_address + '/deals/categories');
  }
  public changeCategory(type){
    this.categoryChanged.next(type);
  }
}
