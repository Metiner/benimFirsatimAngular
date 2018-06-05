import { Component, OnInit } from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';

@Component({
  selector: 'app-upper-point-table',
  templateUrl: './upper-point-table.component.html',
  styleUrls: ['./upper-point-table.component.scss']
})
export class UpperPointTableComponent implements OnInit {

  users= [];

  constructor(private benimFirsatimLib: BenimFirsatimLibrary) { }

  ngOnInit() {

    this.benimFirsatimLib.getUsersTop().subscribe(response=>{
      for(let i = 0 ;i<response.json().length;i++){
        this.users.push(response.json()[i][0]);
      }
    })
  }


}
