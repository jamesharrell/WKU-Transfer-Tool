import { Component, OnInit } from '@angular/core';
import { SchoolSearchService } from '../services/school-search.service';
import { SearchResult } from '../models/search-result.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;

@Component({
    selector: 'app-school-search',
    templateUrl: './school-search.component.html',
})
export class SchoolSearchComponent implements OnInit {
    constructor(private searchService: SchoolSearchService, public router: Router) {

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

            onSelect: function (result, response) {
                this.collegeSelection = result;
                this.router.navigate(['/college/', this.collegeSelection.id]);
            }.bind(this)
        });
    }
}
