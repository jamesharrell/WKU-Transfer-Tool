import {Component, OnInit, Input} from '@angular/core';
import {ListCoursesService} from './list-courses.service';

declare var $: any;

@Component({
    selector: 'app-list-courses',
    templateUrl: './list-courses.component.html',
    styleUrls: ['./list-courses.component.css'],
})

export class ListCoursesComponent implements OnInit {
    @Input() collegeSelection: any;
    courses = [];
    loading = true;

    constructor(private searchService: ListCoursesService) {

    }

    ngOnInit() {

        this.startUp();
    }

    startUp() {
        this.loading = true;
        this.searchService.getCourses(this.collegeSelection.id).subscribe(
            responseCol => {
                this.courses = responseCol;
                console.log('here');
                console.log(this.courses);
            });
    }
    tableReady() {
        this.loading = false;
    }
}
