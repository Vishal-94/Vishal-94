import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { StudentComponent } from './student/student.component';


const routes: Routes = [
  {path:'employee-details', component:EmployeeComponent},
  {path: 'student-details', component : StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
