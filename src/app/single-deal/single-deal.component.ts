import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {commentStateTrigger} from "../animations";
import {ScrollToService,ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";

@Component({
  selector: 'app-single-deal',
  templateUrl: './single-deal.component.html',
  styleUrls: ['./single-deal.component.scss'],
  animations:[commentStateTrigger]
})
export class SingleDealComponent implements OnInit {

  dealId:string = "";
  comments = [];
  //private deal = {};


  //deal = {"id":2,"link":"http://www.sanalmarketim.com/Urun/Dell-Inspiron-3567-B20F41C-Core-i5-7200U-4GB-1TB-R5-M430-2GB-15-6--Linux/83584","price":"2.0","title":"Dell Inspiron 3567 B20F41C Core i5-7200U 4GB 1TB R5 M430 2GB 15.6\" Linux","details":"Kampanyalı Dell Inspiron 3567 B20F41C Core i5-7200U 4GB 1TB R5 M430 2GB 15.6","image_url":"/uploads/q04zfs3h9vg2","view_count":110,"votes_count":5,"comments_count":11,"votes_sum":5,"coupon_code":"","city":null,"location":{"lat":null,"lng":null},"starts_at":null,"finished_at":null,"user":{"id":1,"email":"metinerkck@gmail.com","name":"metinerkck","comments_count":0,"deals_count":0,"score":0,"avatar_url":"https://gravatar.com/avatar/1ba6cf2522810c6a5bd2351d9d9ed024?s=128x128\u0026d=monsterid","created_at":"2017-11-12T16:23:51.449Z"},"vendor":{"id":2,"name":null,"website":"www.sanalmarketim.com","address":null,"tel":null,"location":null,"icon_url":null,"deals_count":1,"created_at":"2017-11-12T16:34:02.982Z","updated_at":"2017-11-12T16:34:02.982Z"},"created_at":"2017-11-12T16:34:02.991Z","updated_at":"2017-12-23T15:47:18.128Z"};
  deal:any;
  constructor(public route:ActivatedRoute,
              public benimFirsatimLib:BenimFirsatimLibrary,
              private _scrollTo:ScrollToService,) { }

  ngOnInit() {
    this.dealId = this.route.snapshot.params['dealId'];
    this.deal = this.benimFirsatimLib.getDealById(this.dealId);
    this.benimFirsatimLib.getComments(this.dealId).subscribe(comments=>{
      this.comments = comments.json();
      for(let i=0;i<this.comments.length;i++){
        this.comments[i].timeCalculation = this.timeCalculation(this.comments[i]);
        if(this.comments[i].comments.length > 0){
          for(let j=0;j<this.comments[i].comments.length;j++){
            this.comments[i].comments[j].timeCalculation = this.timeCalculation(this.comments[i].comments[j]);
          }
        }
      }
      })
  }

  timeCalculation(comment){
    return this.timeConversion(Date.now()-Date.parse(comment.created_at));
  }

  timeConversion(millisec) {

    let seconds = Number((millisec / 1000).toFixed());

    let minutes = Number((millisec / (1000 * 60)).toFixed());

    let hours = Number((millisec / (1000 * 60 * 60)).toFixed());

    let days = Number((millisec / (1000 * 60 * 60 * 24)).toFixed());

    if (seconds < 60) {
      return seconds + " Saniye önce";
    } else if (minutes < 60) {
      return minutes + " Dakika önce";
    } else if (hours < 24) {
      return hours + " Saat önce";
    } else {
      return days + " Gün önce"
    }
  }
  isHaveSubComment(comment){
    if(comment.comments.length > 0)
      return true;
    else
      return false;
  }

  isItLastItem(comment){
    if(this.comments[this.comments.length-1].id == comment.id)
      return true;
  }

  writeToComment(comment){
    console.log(comment);
    comment.writeCommentToComment = true;
    this.scrollToTop();
  }

  scrollToTop(){

    const config: ScrollToConfigOptions = {
      offset : 400
    }

    this._scrollTo.scrollTo(config);

  }
}
