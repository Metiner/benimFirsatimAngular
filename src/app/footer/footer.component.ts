import { Component, OnInit } from '@angular/core';
import {ScrollToService,ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentPage:number;
  totalPage:number;

  constructor(private _scrollTo:ScrollToService,
              private benimFirsatimLib: BenimFirsatimLibrary) { }

  ngOnInit() {
    setTimeout(()=>{
      this.currentPage = this.benimFirsatimLib.currentPaging;
      this.totalPage = this.benimFirsatimLib.totalPage;

    },700)

    this.benimFirsatimLib.resetFooter.subscribe(()=>{
      this.resetFooter();
    })
  }


  scrollToTop(){

    const config: ScrollToConfigOptions = {
      offset : -3000
    }

    this._scrollTo.scrollTo(config);

  }

  nextPage(){
    if(this.currentPage < this.totalPage){
      this.benimFirsatimLib.currentPaging++;
      this.currentPage = this.benimFirsatimLib.currentPaging;
      this.benimFirsatimLib.changeCategory(this.benimFirsatimLib.currentCategory);
    }
  }

  previousPage(){
    if(this.currentPage > 1){
      this.benimFirsatimLib.currentPaging--;
      this.currentPage = this.benimFirsatimLib.currentPaging;
      this.benimFirsatimLib.changeCategory(this.benimFirsatimLib.currentCategory);
    }
  }
  resetFooter(){
    this.currentPage = this.benimFirsatimLib.currentPaging;
    this.totalPage = this.benimFirsatimLib.totalPage;
  }
}
