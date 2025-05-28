import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName : any = "";
  constructor(private apiService: ApiService, private route: Router) {

  }
  ngOnInit() {
    this.userName = localStorage.getItem("username");
    this.apiService.getRole(localStorage.getItem("jwt"), localStorage.getItem("username")).subscribe({
      next: (response) => {
        if (response.role.toLowerCase() === "Role_Admin".toLowerCase()) {
          console.log(response);

        }

      },
      error: (error) => {
        console.error('Failed to update status', error);

      }
    }
    )
  }
  start() {
    if(!localStorage.getItem("jwt")){
      this.route.navigate(["/login"])
    }else{
      this.route.navigate(["/uploadfile"])
    }
    
  }
}
