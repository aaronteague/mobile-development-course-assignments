import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {Assignment } from './assignment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService{
readonly endpoint: string = 'http://localhost:3000/assignments';

constructor(private http: Http){}

addAssignment(newAssignment: Assignment): void{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});
    this.http.post(this.endpoint, newAssignment).toPromise().catch(this.handleError);
}

deleteAssignment(a: Assignment): Promise<any>{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(`${this.endpoint}/${a.id}`, options).toPromise().then(res => res).catch(this.handleError);
}

private handleError(error: Response | any){
    console.error(error);
}

getAllAssignments(): Promise<Assignment[]>{
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers});

    //let assignmentList: Assignment[] = [];
    return this.http.get(this.endpoint, options).toPromise().then(res => res.json() as Assignment[]);
    //assignmentList = a;
   // return assignmentList;
}


mapAssignments(response: Response): Assignment[]{
    console.log(response);
    return response.json() as Assignment[];
}

}