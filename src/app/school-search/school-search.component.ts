import { Component, OnInit } from '@angular/core';
import { SchoolSearchService} from './school-search.service';

declare var $: any;
@Component({
  selector: 'app-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.css']
})
export class SchoolSearchComponent implements OnInit {

  constructor(private searchService: SchoolSearchService) {
  }
  colleges = [];
  ngOnInit() {
      this.searchService.getColleges().subscribe(responseCol => this.colleges = responseCol);
      $('#search-select').dropdown();
      $('#state-select').dropdown();

  }

}
