import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedDataService } from '../shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  imports: [NgFor, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  recordId: any;
  deleteUser: boolean = false;
  userData: boolean = true;
  constructor(private http: HttpClient, private apiService: ApiService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.apiService.getAllUsers(localStorage.getItem("jwt")).subscribe({
      next: (response) => {
        this.users = response.filter((each: any) => {
          if (each.username !== localStorage.getItem("username")) {
            return true
          }
          else {
            return false
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  Delete(id: any) {
    this.userData = false;
    this.deleteUser = true;
    this.recordId = id;

  }
  yesDelete() {

    this.deleteUser = true;
    console.log(this.recordId)
    const jwtToken = localStorage.getItem("jwt");
    this.apiService.deleteUserById(this.recordId, jwtToken).subscribe(() => {
      console.log("User Deleted successfully");

      this.snackBar.open("User Deleted Successfully", "Close", { duration: 2000 });
      this.deleteUser = false;
      this.userData = true;

      // Delay route navigation until after the snackbar has had time to display.
      setTimeout(() => {
        this.route.navigate(["/user"]);
      }, 2100); // A little extra time ensures the snackbar completes its display.

    },
      (error) => {
        if (error.status === 200) {
          console.log("User Deleted successfully");
          console.log(error.status);
          this.snackBar.open("User Deleted Successfully", "Close", { duration: 2000 });
          this.deleteUser = false;
          this.userData = true;

          // Delay route navigation until after the snackbar has had time to display.
          setTimeout(() => {
            this.route.navigate(["/user"]);
          }, 2100);
        } else {
          console.error("Error fetching record details", error);
          this.snackBar.open("User Deleted Failed", "Close", { duration: 2000 });
          this.deleteUser = false;
          this.userData = true;
          this.route.navigate(["/user"]);
        }

      });


    setTimeout(() => {
      this.apiService.getAllUsers(localStorage.getItem("jwt")).subscribe({
        next: (response) => {
          this.users = response.filter((each: any) => {
            if (each.username !== localStorage.getItem("username")) {
              return true
            }
            else {
              return false
            }
          })
        },
        error: (error) => {
          console.log(error)
        }
      });


    }, 500)

  }
  noDelete() {
    this.route.navigate(["/user"]);
    this.deleteUser = false;
    this.userData = true;
  }


}