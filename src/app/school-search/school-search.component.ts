import {Component, OnInit} from '@angular/core';
import {SchoolSearchService} from './school-search.service';
import {SearchResult} from '../search-result.model';
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
    collegeSelection;

    ngOnInit() {

        this.searchService.getColleges().subscribe(
            responseCol => {
                this.colleges = responseCol;
                this.handleData();
            });
    }

    handleData() {
        $('.ui.search').search({
            source: this.colleges,
            searchFields: [
                'title',
                'location'
            ]
        });
    }

    onSubmit() {
        this.collegeSelection = $('.ui.search').search('get result');
    }
}
