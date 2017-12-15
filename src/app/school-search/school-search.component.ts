import {Component, OnInit} from '@angular/core';
import {SchoolSearchService} from '../services/school-search.service';
import {SearchResult} from '../models/search-result.model';

import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'app-school-search',
    templateUrl: './school-search.component.html',
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
