import {Component, OnInit} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
declare var $:any;
@Component({
  selector: 'app-create-new-deal',
  templateUrl: './create-new-deal.component.html',
  styleUrls: ['./create-new-deal.component.scss']
})
export class CreateNewDealComponent implements OnInit {


  dealImages=['http://via.placeholder.com/200x250','http://via.placeholder.com/150x150','http://via.placeholder.com/150x100','http://via.placeholder.com/350x250','http://via.placeholder.com/250x250']
  categories = [];


  constructor(public benimFirsatimlib: BenimFirsatimLibrary) { }

  ngOnInit() {

    this.categories = this.benimFirsatimlib.categories;

    $(document).ready(function() {

      $('.bxslider').bxSlider({
        autoControls: true,
        stopAutoOnClick: true,
        speed : 1000,
        slideWidth: 100,
        minSlides:1,
        maxSlides:5,
        pager : false
      });
    });
  }
}
