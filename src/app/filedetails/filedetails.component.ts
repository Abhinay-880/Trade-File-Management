import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filedetails',
  imports: [NgIf],
  templateUrl: './filedetails.component.html',
  styleUrl: './filedetails.component.css'
})
export class FiledetailsComponent implements OnInit {
  recordId: any;
  recordDetails: any = {}; // Store fetched details
  deletePopUp : boolean = false;
  fileDetailsCheck : boolean = true;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.fetchRecordDetails();
  }
  updateStatus(id: any) {
    console.log(id)
    this.router.navigate(["/update", id])
  }
  fetchRecordDetails() {
    const jwtToken = localStorage.getItem("jwt");

    this.apiService.getRecordById(this.recordId, jwtToken).subscribe(
      (data) => {
        this.recordDetails = data;
      },
      (error) => {
        console.error("Error fetching record details", error);
      }
    );
  }
  delete(){
    this.fileDetailsCheck = false;
    this.deletePopUp = true;
  }
  back() {
    this.router.navigate(["/dashboard"]);
    
  }
  backToFileDetails(){
    this.router.navigate(["/filedetails"]);
    this.deletePopUp = false;
    this.fileDetailsCheck = true;
  }
  deleteRecor(id: any) {
    const jwtToken = localStorage.getItem("jwt");
    this.apiService.deleteRecordById(this.recordId, jwtToken).subscribe(() => {

      console.log("record Deleted successfully")
      this.snackBar.open("Record Deleted Successfully", "Close", { duration: 2000 });
      this.router.navigate(["/dashboard"]);
    },
      (error) => {
        console.error("Error fetching record details", error);
      }
    );
    this.router.navigate(["/dashboard"]);
    this.deletePopUp = false;
    this.fileDetailsCheck = true;
  }
}
