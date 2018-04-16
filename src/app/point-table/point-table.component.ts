import { Component, OnInit } from '@angular/core';
import {BenimFirsatimLibrary} from "../services/benimFirsatimLibrary";

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss']
})
export class PointTableComponent implements OnInit {

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
