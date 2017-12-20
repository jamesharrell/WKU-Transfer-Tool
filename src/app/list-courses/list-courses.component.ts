import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListCoursesService } from '../services/list-courses.service';

declare var $: any;

@Component({
    selector: 'app-list-courses',
    templateUrl: './list-courses.component.html',
})

export class ListCoursesComponent {

    courses: string[];
    loading: boolean;
    collegeID: number;

    constructor(private route: ActivatedRoute, private searchService: ListCoursesService) {
        route.params.subscribe(params => {
            this.collegeID = params['id'];
            this.startUp();
        });
    }

    startUp() {
        // Used to show the loading indicator for when data of colleges is being loaded
        this.loading = true;

        if (this.collegeID) {
            this.searchService.getCourses(this.collegeID).subscribe(
                responseCol => {
                    this.courses = responseCol;
                    this.loading = false;
                });
        }
    }
}
