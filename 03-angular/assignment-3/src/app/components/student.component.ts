import {OnInit, Component } from '@angular/core';





import {Assignment} from './assignment';
import { DataService } from './data.service';
// import * as express from "express";
// import {Server, Path, GET, PathParam } from "typescript-rest";




@Component({
    moduleId: module.id,
  selector: 'student',
  templateUrl: `student.component.html`,
  providers: [DataService]
})


// @Path("/hello")
export class StudentComponent implements OnInit{


  


  name: string;
  email: string;

  assignmentList: Assignment[];

  tPoints: number = 0;
  tPointsPossible: number = 0;
  tGrade: number = 0;
  tLetterGrade: string = "F";

  iAssignmentName: string;
  iPointsPossible: number;
  iPointsScored: number;


  constructor(private data: DataService) {
    this.name = 'Aaron Teague';
    this.email = "aaron.teague@outlook.com";

   
    this.assignmentList = [];

    

    
  }

  updatePerformance(): void{
    this.tPoints = this.assignmentList.reduce(this.getPointsScored, 0);
   this.tPointsPossible = this.assignmentList.reduce(this.getPointsPossible, 0);
   this.tGrade = this.tPoints / this.tPointsPossible;
   this.tLetterGrade = this.getLetterGrade(this.tGrade);
  }

  refresh(): void {
    this.data.getAllAssignments().then(res => {this.assignmentList = res; this.updatePerformance()}).catch(res => console.log("error getting all data"));


  }

  ngOnInit(): void {
    this.refresh();
  }



  addAssignment(): void {
   let a = {name: this.iAssignmentName,
        pointsScored: this.iPointsScored, 
        pointsPossible: this.iPointsPossible,
        percent: this.iPointsScored / this.iPointsPossible,
        letterGrade: this.getLetterGrade(this.iPointsScored / this.iPointsPossible),
        id: Math.random()
    }
    
    
   // this.assignmentList.push(a);


   
   this.iAssignmentName = "";
   this.iPointsScored = 0;
   this.iPointsPossible = 0;
   
   




    this.data.addAssignment(a);
  
    this.refresh();

  }



  getPointsPossible(total: number, a: Assignment): number {
    return total += a.pointsPossible;
  }

  getPointsScored(total: number, a:Assignment): number {
    return total += a.pointsScored;
  }

  removeAssignment(index: number){
    this.data.deleteAssignment(this.assignmentList[index]).then(res => this.refresh());
    //  this.assignmentList.splice(index, 1);
   //   this.refresh();
  }



  getLetterGrade(grade: number): string{
    
    if(grade >= 0.9)
      return "A";
    else if(grade >= 0.8)
      return "B";
    else if(grade >= 0.7)
      return "C";
    else if(grade >= 0.6)
      return "D";
    else
      return "F";
  }
}

interface assignmentJson{
  id: number,
  name: string,
  pPossible: number,
  pScored: number
}



// let app: express.Application = express();
// Server.buildServices(app);

// app.listen(300, function() {
//   console.log('Rest Server listening on port 3000!');
// })