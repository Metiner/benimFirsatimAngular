import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BenimFirsatimLibrary {
  api_address = "https://benimfirsatim.com";

  constructor(public http: Http ) {
  }

  public getCategories(){
    return this.http.get(this.api_address + '/deals/categories');
  }
}
