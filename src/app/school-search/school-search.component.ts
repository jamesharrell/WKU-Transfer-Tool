import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.css']
})
export class SchoolSearchComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
      $('#search-select').dropdown();
      $('#state-select').dropdown();
  }

}
