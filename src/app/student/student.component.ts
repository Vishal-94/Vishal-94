import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student_data= [
    {
      City: "Solapur",
      Course: "BE",
      DOB: new Date('08-06-1994'),  
      //"Mon Aug 09 1993 00:00:00 GMT+0530 (India Standard Time)",
      Email: "vishalraobandagar1994@gmail.com",
      FirstName: "Vishal",
      Gender: "Male",
      LastName: "Bandagar",
      ID : 1
    },{
    City: "Kolhapur",
    Course: "Diploma",
    DOB: new Date('08-09-1993'),
    Email: "sagar@gmail.com",
    FirstName: "Sagar",
    Gender: "Male",
    LastName: "Patil",
    ID : 2
  },{
    City: "Pune",
    Course: "BE",
    DOB: new Date('07-23-1992'),
    Email: "amit@gmail.com",
    FirstName: "Amit",
    Gender: "Male",
    LastName: "Shinde",
    ID : 3
  },{
    City: "Sangali",
    Course: "ME",
    DOB: new Date('05-15-1995'),
    Email: "Sumit@gmail.com",
    FirstName: "Sumit",
    Gender: "Male",
    LastName: "Sagare",
    ID : 4
  },{
    City: "Solapur",
    Course: "BE",
    DOB: new Date('06-09-1996'),
    Email: "shruti@gmail.com",
    FirstName: "Shruti",
    Gender: "Female",
    LastName: "Khandekar",
    ID : 5
  }]
  
  student_detials: MatTableDataSource<any>
  displayedColumns:any = ['ID','FirstName', 'LastName', 'Gender', 'DOB','City','Email','Course','Action', 'Delete'];
  studentDialogRef : MatDialogRef<StudentDialogModal, any>;
  studentRecordData:any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.student_detials = new MatTableDataSource(this.student_data);
  }
  
  editStudentRecord(rowdata:any){
    this.studentRecordData = rowdata;
    this.openStudentDialogModal();
  }
  
  deleteStudentRecord(data:any){
    let self = this;
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this record?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c2185b',
        cancelButtonColor: '#c2185b',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (d) {
        if (d.value) {
          let filteredStudentList = self.student_data.filter((item) => item.FirstName !== data.FirstName);
          
          self.student_detials = new MatTableDataSource(filteredStudentList);
          
          Swal.fire({
            title: 'Student record deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#c2185b',
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'OK',
            allowEscapeKey: false,
          })
        }
      });
  }

  openStudentDialogModal(){
    let self = this;
    this.studentDialogRef = this.dialog.open(StudentDialogModal, {
      width: '850px',
      height:'560px',
      panelClass: 'student-dialog-container',
      data: {
        studentRecordData: this.studentRecordData
      }
    });
    this.studentDialogRef.afterClosed().subscribe(studentData => {
      if( studentData!= undefined && studentData['recordAdded'] != undefined){
        
        delete studentData.recordAdded;
        var isIDExist:boolean
        self.student_data.map((obj) => {
          if(obj.ID == studentData.ID){
            isIDExist = true;
          }
        })

        if(isIDExist == true){
          this.studentRecordData = '';
          Swal.fire({
            title: 'ID already exist.Please enter unique ID',
            icon: 'warning',
            confirmButtonColor: '#c2185b',
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'OK',
            allowEscapeKey: false,
          })  
        }else{
          self.student_data.push(studentData);        
          self.student_detials = new MatTableDataSource(self.student_data);
          this.studentRecordData = '';
          Swal.fire({
            title: 'Student record added successfully.',
            icon: 'success',
            confirmButtonColor: '#c2185b',
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'OK',
            allowEscapeKey: false,
          })
        }
      }else if( studentData!= undefined && studentData['recordEdited'] != undefined){
        delete studentData.recordEdited;
        self.student_data.map((obj) => {
          if(obj.ID == studentData.ID){
            obj.City = studentData.City,
            obj.Course=  studentData.Course,
            obj.DOB = studentData.DOB,
            obj.Email= studentData.Email,
            obj.FirstName = studentData.FirstName,
            obj.Gender = studentData.Gender,
            obj.LastName = studentData.LastName
          }
        })
        self.student_detials = new MatTableDataSource(self.student_data);

        Swal.fire({
          title: 'Student record updated successfully.',
          icon: 'success',
          confirmButtonColor: '#c2185b',
          focusConfirm: false,
          allowOutsideClick: false,
          confirmButtonText: 'OK',
          allowEscapeKey: false,
        })

        this.studentRecordData = '';
      }
    });
  }
  
}


@Component({
  selector: 'create-task-dialog',
  templateUrl: './student-dialog-modal.html',
  styleUrls: ['./student.component.css']
})
export class StudentDialogModal implements OnInit {

  regiForm: FormGroup;  
  FirstName:string='';  
  LastName:string='';  
  Address:string='';  
  DOB:Date=null;  
  Gender:string='';  
  Course:string='';  
  Email:string='';  
  IsAccepted:number=0;
  City = '';
  ID = '';
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<StudentDialogModal> ,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {   
  
    // To initialize FormGroup  
    this.regiForm = fb.group({  
      'FirstName' : [null, Validators.required],  
      'LastName' : [null, Validators.required],  
      'City' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],  
      'DOB' : [null, Validators.required],  
      'Gender':[null, Validators.required],  
      'Course':[null, Validators.required],  
      'Email':[null, Validators.compose([Validators.required,Validators.email])],
      'ID':[null, Validators.required],
    });  
  
  }  
  dialogTitle:string;
  disableID:boolean = false;

  ngOnInit() {
    this.dialogTitle = "Add Student Details";
    if (this.data.studentRecordData) {
      this.dialogTitle = "Edit Student Details";
      this.disableID = true;

      this.regiForm.setValue({
        FirstName : this.data.studentRecordData['FirstName'],
        LastName : this.data.studentRecordData['LastName'],
        City : this.data.studentRecordData['City'],
        DOB : this.data.studentRecordData['DOB'],
        Gender : this.data.studentRecordData['Gender'],
        Course : this.data.studentRecordData['Course'],
        Email : this.data.studentRecordData['Email'],
        ID : this.data.studentRecordData['ID']
     });

    }else{
      this.disableID = false;
    }

  }

  onCloseDialog() {
    this.dialogRef.close("closeOnly");
  }

  updateStudentRecord(form){
    form['recordEdited'] = true;
    this.dialogRef.close(form);
  }

  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    if(this.data.studentRecordData != undefined && this.data.studentRecordData != null && this.data.studentRecordData != '' ){
      this.updateStudentRecord(form);
      return
    }
    form['recordAdded'] = 'recordAdded'; 
    this.dialogRef.close(form);
  }
}
