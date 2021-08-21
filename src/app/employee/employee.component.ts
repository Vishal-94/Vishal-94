import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  candidate_data :any = [{
    "id": 11,
    "name": "Ash",
    "department": "Finance",
    "joining_date": "8/10/2016"
  }, 
  {
    "id": 12,
    "name": "John",
    "department": "HR",
    "joining_date": "18/01/2011"
  },
  {
    "id": 13,
    "name": "Zuri",
    "department": "Operations",
    "joining_date": "28/11/2019"
  }, 
  {
    "id": 14,
    "name": "Vish",
    "department": "Development",
    "joining_date": "7/7/2017"
  }, 
  {
    "id": 15,
    "name": "Barry",
    "department": "Operations",
    "joining_date": "19/8/2014"
  }, 
  {
    "id": 16,
    "name": "Ady",
    "department": "Finance",
    "joining_date": "5/10/2014"
  }, 
  {
    "id": 17,
    "name": "Gare",
    "department": "Development",
    "joining_date": "6/4/2014"
  }, 
  {
    "id": 18,
    "name": "Hola",
    "department": "Development",
    "joining_date": "8/12/2010"
  }, 
  {
    "id": 19,
    "name": "Ola",
    "department": "HR",
    "joining_date": "7/5/2011"
  }, 
  {
    "id": 20,
    "name": "Kim",
    "department": "Finance",
    "joining_date": "20/10/2010"
  }]

  candidate_detials: MatTableDataSource<any>
  distinctArr = {};
  displayedColumns:any = ['id', 'name', 'department', 'joining_date'];
  searchedNamed:string;
  isCountBtnClicked:boolean;
  noSearchMatched:boolean = false;
  constructor() { }
  
  ngOnInit(): void {
    this.candidate_detials = new MatTableDataSource(this.candidate_data);
  }
  
  sortByName(){
    let sortByName = this.candidate_data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.candidate_detials = new MatTableDataSource(sortByName);
  }

  sortByJoiningDate(){
     let sortByJoiningDate = this.candidate_data.sort(function(a, b){
      var aa = a.joining_date.split('/').reverse().join(),
          bb = b.joining_date.split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
      });
      this.candidate_detials = new MatTableDataSource(sortByJoiningDate);
  }

  checkExperience(){
    let expCandidate = this.candidate_data.filter(x=> {
      if(this.checkExpYears(x.joining_date)){
        return x;
      } 
    });
    this.candidate_detials = new MatTableDataSource(expCandidate);
  }


  checkExpYears(date) {
    let joining_date = moment(date,["DD/MM/YYYY" , "D/M/YYYY"] ).format("YYYY/MM/DD")
    let yearDiff = moment().diff(joining_date, 'years',true);
    if(yearDiff > 2){
      return true;
    }else{
      return false
    }
  }

  searchByName(){
    let searchByCandidateName = this.candidate_data.filter(x=> {
      if(x.name === this.searchedNamed){
        return x;
      } 
    });
    if(searchByCandidateName.length == 0){
      this.noSearchMatched = true;
    }
    this.candidate_detials = new MatTableDataSource(searchByCandidateName);
  }
  
  restSetData(){
    this.noSearchMatched = false;
    this.searchedNamed ='';
    this.isCountBtnClicked = false;
    this.candidate_detials = new MatTableDataSource(this.candidate_data);
  }

  removeCandidiated(){
    let removedCandidate = this.candidate_data.filter(x=> {
      if(x.department != 'Development'){
        return x;
      } 
    });
    this.candidate_detials = new MatTableDataSource(removedCandidate);
  }

  candidateCountInEachDept(){
    this.isCountBtnClicked = true;
    for(var i =0; i< this.candidate_data.length;i++){
      if(this.distinctArr.hasOwnProperty(this.candidate_data[i].department)){
        this.distinctArr[this.candidate_data[i].department]++;
      }else {
        this.distinctArr[this.candidate_data[i].department] = 1;
      }
    }
  }
}


