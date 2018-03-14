import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {dealAvatarSelectionTrigger, showMeTrigger} from '../animations';
declare var $:any;
@Component({
  selector: 'app-create-new-deal',
  templateUrl: './create-new-deal.component.html',
  styleUrls: ['./create-new-deal.component.scss'],
  animations: [showMeTrigger,dealAvatarSelectionTrigger]
})
export class CreateNewDealComponent implements OnInit {

  @ViewChild('allCategories') allCategories:any;
  @ViewChild('allImages') allImages:any;

  dealImages=['http://via.placeholder.com/200x250','http://via.placeholder.com/150x150','http://via.placeholder.com/150x100','http://via.placeholder.com/350x250','http://via.placeholder.com/250x250'];
  categories = [{'id':14,'name':'Bilgisayar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.333Z','updated_at':'2017-12-12T10:43:18.333Z'},{'id':17,'name':'Ev Gereçleri','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:02:49.897Z','updated_at':'2018-01-06T20:02:49.897Z'},{'id':1,'name':'Moda \u0026 Aksesuarlar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-12T23:40:35.480Z','updated_at':'2017-11-12T23:40:35.480Z'},{'id':15,'name':'Yeme \u0026 İçme','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.682Z','updated_at':'2017-12-12T10:43:18.682Z'},{'id':2,'name':'Cep Telefonu','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-13T09:28:37.551Z','updated_at':'2017-11-13T09:28:37.551Z'},{'id':6,'name':'Müzik','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-18T20:41:29.809Z','updated_at':'2017-11-18T20:41:29.809Z'},{'id':13,'name':'Eğlence','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.532Z','updated_at':'2017-11-28T23:24:12.532Z'},{'id':5,'name':'Yazılım','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-14T15:42:38.043Z','updated_at':'2017-11-14T15:42:38.043Z'},{'id':11,'name':'Mutfak Aleti','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.509Z','updated_at':'2017-11-28T23:24:12.509Z'},{'id':10,'name':'Ev Aleti','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.402Z','updated_at':'2017-11-28T23:24:12.402Z'},{'id':3,'name':'Elektronik','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-13T09:28:37.582Z','updated_at':'2017-11-13T09:28:37.582Z'},{'id':20,'name':'Diğer','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-07T10:56:12.291Z','updated_at':'2018-01-07T10:56:12.291Z'},{'id':4,'name':'Mobilya','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-14T15:42:38.029Z','updated_at':'2017-11-14T15:42:38.029Z'},{'id':16,'name':'Tatil \u0026 Gezi','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-12-12T10:43:18.874Z','updated_at':'2017-12-12T10:43:18.874Z'},{'id':19,'name':'Freebies','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:07:21.451Z','updated_at':'2018-01-06T20:07:21.451Z'},{'id':18,'name':'Çinden Fırsatlar','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2018-01-06T20:05:55.103Z','updated_at':'2018-01-06T20:05:55.103Z'},{'id':12,'name':'Güzellik \u0026 Kişisel Bakım','deals_count':null,'users_count':null,'icon_url':null,'created_at':'2017-11-28T23:24:12.520Z','updated_at':'2017-11-28T23:24:12.520Z'}];



  constructor(public benimFirsatimlib: BenimFirsatimLibrary) { }

  ngOnInit() {

    //this.categories = this.benimFirsatimlib.categories;

    $(document).ready(function() {

      $('.bxslider').bxSlider({
        autoControls: true,
        stopAutoOnClick: true,
        speed : 1000,
        slideWidth: 200,
        minSlides:3,
        maxSlides:3,
        touchEnabled:false,
        pager : false,
        easing : 'ease-in-out'
      });
    });
  }


  showMe(element){
    const arr = this.allCategories.nativeElement.children;
    for(let i=0;i<arr.length;i++){
      if(arr[i] != element)
      arr[i].show = 'notShow';
    }

    if(element.show == 'show'){
     element.show = 'notShow';
    }
    else {
     element.show = 'show';
    }
  }

  selectMe(element){
    const arr = this.allImages.nativeElement.children;
    for(let i=0;i<arr.length;i++){
      if(arr[i] != element)
        arr[i].children[0].select = 'unSelected';
    }

    if(element.select == 'selected'){
      element.select = 'unSelected';
    }
    else {
      element.select= 'selected';
    }

  }


}
