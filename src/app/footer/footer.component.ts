import { Component, OnInit } from '@angular/core';
import {ScrollToService,ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _scrollTo:ScrollToService,
              private benimFirsatimLib: BenimFirsatimLibrary) { }

  ngOnInit() {
  }

  scrollToTop(){

    const config: ScrollToConfigOptions = {
      offset : -3000
    }

    this._scrollTo.scrollTo(config);

  }

  nextPage(){
      this.benimFirsatimLib.currentPaging++;
  }

  previousPage(){
      this.benimFirsatimLib.currentPaging--;
  }
}
