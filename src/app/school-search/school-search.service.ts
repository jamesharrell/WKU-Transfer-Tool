import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SchoolSearchService {
    constructor(private http: Http) {

    }
    private url: string = 'http://localhost:3000/colleges';

    getColleges() {
        return this.http.get(this.url).map((response: Response) => response.json());
    }
}
