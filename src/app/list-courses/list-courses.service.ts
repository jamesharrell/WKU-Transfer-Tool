import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()


export class ListCoursesService {
    constructor(private http: Http) {

    }
    private url;
    getCourses(id) {
        console.log('LIST-COURSE SERVICE');
        this.url = 'http://trantool.jamesharrell.me:3001/courses?collegeID=' + id;
        return this.http.get(this.url).map((response: Response) => response.json());
    }
}
