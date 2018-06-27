import { Component, OnInit } from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  myComments: any = [];
  commentsThatIiked = [];
  myReplies: any = [];
  generalViewElements: any = [];

  showCount = 100;
  constructor(private benimFirsatimLibrary: BenimFirsatimLibrary) {
    this.getActivity();
  }

  ngOnInit(): void {
}

  getActivity(): void {
  this.benimFirsatimLibrary.getMyComments().subscribe(response => {
    this.myComments = response.json().entries;

    for (let i = 0; i < this.myComments.length; i++) {

      this.myComments[i].type = 'myComments';
      this.generalViewElements.push(this.myComments[i]);
    }
  });
  this.benimFirsatimLibrary.getCommentsThatIliked().subscribe(response => {

    this.commentsThatIiked = response.json();


  });
  this.benimFirsatimLibrary.getMyReplies().subscribe(response => {
    const temp = response.json().entries;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].comments.length > 0) {
        for (let j = 0; j < temp[i].comments.length; j++) {
          temp[i].comments[j].type = 'myReplies';
          this.generalViewElements.push(temp[i].comments[j]);
        }
      }
    }
  });
}

  timeCalculation(comment): string {
  return this.timeConversion(Date.now() - Date.parse(comment.created_at));
}

  timeConversion(millisec): string {

  const seconds = Number((millisec / 1000).toFixed());

  const minutes = Number((millisec / (1000 * 60)).toFixed());

  const hours = Number((millisec / (1000 * 60 * 60)).toFixed());

  const days = Number((millisec / (1000 * 60 * 60 * 24)).toFixed());

  if (seconds < 60) {
    return seconds + ' Saniye önce';
  } else if (minutes < 60) {
    return minutes + ' Dakika önce';
  } else if (hours < 24) {
    return hours + ' Saat önce';
  } else {
    return days + ' Gün önce';
  }
}

}
