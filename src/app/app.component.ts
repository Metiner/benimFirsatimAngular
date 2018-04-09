import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  constructor(){
    $(document).ready(function(){
      var ua = navigator.userAgent;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      window.location.href= 'https://mobile.benimfirsatim.com';
      }

      else if(/Chrome/i.test(ua)){

      }
      else
      {

      }
    });
  }

}
