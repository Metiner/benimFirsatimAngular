import { Component, OnInit } from '@angular/core';
import {ContentComponent} from '../content/content.component';

@Component({
  selector: 'app-create-new-deal',
  templateUrl: './create-new-deal.component.html',
  styleUrls: ['./create-new-deal.component.scss']
})
export class CreateNewDealComponent implements OnInit {

  dealImages=['http://via.placeholder.com/200x250','http://via.placeholder.com/150x150','http://via.placeholder.com/150x100','http://via.placeholder.com/350x250','http://via.placeholder.com/250x250']

  constructor(public content : ContentComponent) { }

  ngOnInit() {
  }

}
