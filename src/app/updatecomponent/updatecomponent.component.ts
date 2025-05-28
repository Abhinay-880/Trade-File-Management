import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatecomponent',
  imports: [FormsModule, NgIf],
  templateUrl: './updatecomponent.component.html',
  styleUrl: './updatecomponent.component.css'
})
export class UpdatecomponentComponent {
  new_new: boolean = true;
  new_failed: boolean = true;
  new_processed: boolean = true;
  recordDetails: string = "";
  new_status_value: string = '';
  id: any;
  recordId: any;
  jwtToken: string | null = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.jwtToken = localStorage.getItem("jwt");

    if (!this.id || !this.jwtToken) {
      console.error("Invalid ID or JWT token");
      return;
    }

    this.fetchRecordDetails();
  }

  fetchRecordDetails() {
    this.apiService.getRecordById(this.id, this.jwtToken).subscribe(
      (data) => {
        console.log(data);
        this.recordDetails = data.status;

        // Adjust visibility based on status
        this.adjustStatusVisibility(this.recordDetails);
      },
      (error) => {
        console.error("Error fetching record details", error);
      }
    );
  }

  adjustStatusVisibility(status: string) {
    if (status === "NEW") {
      this.new_new = false;
      this.new_failed = true;
      this.new_processed = true;
    } else if (status === "FAILED") {
      this.new_new = true;
      this.new_failed = false;
      this.new_processed = true;
    } else {
      this.new_new = true;
      this.new_failed = true;
      this.new_processed = false;
    }
  }

  update_status() {
    console.log(this.id);
    console.log(this.jwtToken)
    console.log(this.new_status_value)
    if (!this.id || !this.jwtToken || !this.new_status_value) {
      console.error("Missing parameters for update");
      return;
    }

    this.apiService.updateRecord(this.id, this.jwtToken, this.new_status_value).subscribe(
      (response) => {
        console.log('Status updated successfully', response);
        this.snackBar.open("Record Updated Successfully", "Close", { duration: 2000 });
        this.back();
      },
      (error) => {
        console.error('Failed to update status', error);
        alert("Failed to update record!");
      }
    );
  }
  back() {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(["/filedetails", this.recordId]);
  }

}
