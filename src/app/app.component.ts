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
      var state = '';
      var flag = false;
      $(window).resize(()=>{

        if(state === 'web' && flag && $(window).width() < 768 ){
          window.location.href= 'https://mobile.benimfirsatim.com';
        }

        if(state === 'mobile' && flag && $(window).width() > 768 ){
          window.location.href= 'https://www.benimfirsatim.com';
        }

        if(state === 'mobile' && !flag){
          window.location.href= 'https://mobile.benimfirsatim.com';
          flag = true;

        }
        if(state === 'web' && !flag){
          window.location.href= 'https://www.benimfirsatim.com';
          flag = true;

        }
        if($(window).width() < 768){
          state = 'mobile';
        }else if($(window).width() > 768){
          state = 'web';
        }

      });

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
