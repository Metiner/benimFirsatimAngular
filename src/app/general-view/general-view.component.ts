import { Component, OnInit } from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  myComments:any = [];
  commentsThatIiked = [];
  myReplies = [];
  constructor(private benimFirsatimLibrary: BenimFirsatimLibrary) {
    this.getActivity();
  }

  ngOnInit() {
  }

  getActivity(){
    this.benimFirsatimLibrary.getMyComments().subscribe(response=>{
      this.myComments = response.json();
    });
    this.benimFirsatimLibrary.getCommentsThatIliked().subscribe(response=>{

      this.commentsThatIiked = response.json();


    })
    this.benimFirsatimLibrary.getMyReplies().subscribe(response=>{
      this.myReplies = response.json();
      console.log(this.myReplies);

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

}
