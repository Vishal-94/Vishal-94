import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isRouteChange:boolean = false;
  
  constructor( private router: Router){
  }
  navigatToEmployeeTab(){
    this.isRouteChange = true;
    this.router.navigate(['employee-details']);
  }
}
