import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {Assignment } from './assignment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService{
readonly endpoint: string = 'http://localhost:4000/assignments';

constructor(private http: Http){}

addAssignment(newAssignment: Assignment): void{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});
    this.http.post(this.endpoint, newAssignment).toPromise().catch(this.handleError);
}

deleteAssignment(a: Assignment): void{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});
    this.http.delete(`${this.endpoint}/${a.id}`, options).toPromise().catch(this.handleError);
}

private handleError(error: Response | any){
    console.error(error);
}

getAllAssignments(): Observable<Assignment[]>{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});

    //let assignmentList: Assignment[] = [];
    return this.http.get(this.endpoint, options).map(this.mapAssignments);
    //assignmentList = a;
   // return assignmentList;
}


mapAssignments(response: Response): Assignment[]{
    console.log(response);
    return response.json() as Assignment[];
}

}