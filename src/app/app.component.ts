import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from './api.service';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatCheckboxModule,RouterLink,RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  DisplayUser : boolean = false;
  LogOut : boolean = false;
  loginCheck : boolean = true;
  registerCheck : boolean = true;
  uploadfileCheck : boolean = false;
  dashboardCheck : boolean = false;
  title = 'trade-file';
  userName : any = "";
  constructor(private apiService : ApiService,private route : Router,private snackBar: MatSnackBar){
    this.userName = localStorage.getItem("username");
    if (!localStorage.getItem("jwt")) {
      this.LogOut = false;
      this.route.navigate(["/login"]);
      
    } else {
      this.LogOut = true;
      this.loginCheck = false;
      this.registerCheck = false;
      this.uploadfileCheck = true;
      this.dashboardCheck = true;
      this.route.navigate(["/home"])
    }
    this.apiService.getRole(localStorage.getItem("jwt"),localStorage.getItem("username")).subscribe({
      next:(response) => {
        if(response.role.toLowerCase()==="Role_Admin".toLowerCase()){
          console.log(response.role);
          this.DisplayUser = true;
         
        }
        
      },
      error:(error) => {
        console.error('Invalid Credinitials', error);
        
      }
    }
    )
  }
  ngOnInit() {
    
    
    
  }
  
  logOut(){
    this.LogOut = false;
    
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    console.log("logout works");
  
    // Open the snackBar message
    this.snackBar.open("Logged out successfully.", "Close", { duration: 2000 });
    
    // Wait 2.1 seconds (a little longer than the snackBar duration) before navigating and reloading
    setTimeout(() => {
      this.route.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }, 500);
  }
  
  
  
}
