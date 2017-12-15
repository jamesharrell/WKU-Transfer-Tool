import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ListCoursesService } from '../services/list-courses.service';

declare var $: any;

@Component({
    selector: 'app-list-courses',
    templateUrl: './list-courses.component.html',
})

export class ListCoursesComponent implements OnInit, OnChanges {
    @Input() collegeSelection: any;
    courses = [];
    loading = true;

    constructor(private searchService: ListCoursesService) {

    }

    ngOnInit() {
        this.startUp();
    }
    ngOnChanges(changes: SimpleChanges) {
         this.startUp();
    }
    startUp() {
        this.loading = true;
        this.searchService.getCourses(this.collegeSelection.id).subscribe(
            responseCol => {
                this.courses = responseCol;
                this.loading = false;
            });
    }
}
