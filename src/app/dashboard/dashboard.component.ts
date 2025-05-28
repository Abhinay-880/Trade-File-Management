import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchCriteriaComponent } from '../search-criteria/search-criteria.component';
import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    SearchCriteriaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fileName', 'status', 'recordCount', 'errors', 'localDate','icon'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private route: Router, private sharedDataService: SharedDataService) { }

  fileDetailsById(id: any) {
    this.route.navigate(["/filedetails", id])
  }
  ngOnInit() {
    this.fetchData();
    this.sharedDataService.searchResults$.subscribe((data) => {
      this.dataSource.data = data;
    }
    )
  }

  fetchData() {
    const jwtToken = localStorage.getItem("jwt"); // Retrieve JWT token from local storage

    if (!jwtToken) {
      this.route.navigate(["/login"]);
      alert("Please Login");
      console.error("JWT Token not found!");
      return;
    }

    this.apiService.getRecords(jwtToken).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error("Failed to fetch data", error);
      }
    );
  }
  Filter() {
    this.route.navigate(["/searchCriteria"])
  }
}

export interface PeriodicElement {
  id: number;
  fileName: string;
  status: string;
  recordCount: number;
  errors: string;
  localDate: Date;
}
