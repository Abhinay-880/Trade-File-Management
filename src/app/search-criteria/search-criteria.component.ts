import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-criteria',
  imports: [FormsModule],
  templateUrl: './search-criteria.component.html',
  styleUrl: './search-criteria.component.css'
})
export class SearchCriteriaComponent {
  Id: any = "";
  FileName: string = "";
  Status: string = "";
  FromDate: any;
  ToDate: any;
  todayDate:string=new Date().toISOString().split('T')[0];

  constructor(
    
    private route: Router, 
    private apiService: ApiService, 
    private sharedDataService: SharedDataService,
    private snackBar: MatSnackBar
  ) {}

  ClearFilter(event?: Event) {
    
    
    this.Id = null;
    this.FileName = "";
    this.Status = "";
    this.FromDate = null;
    this.ToDate = null;
    this.apiService.searchByField(localStorage.getItem("jwt"),"","",null,null,null).subscribe({
      next:(response)=>{
        console.log(response);
        this.sharedDataService.updateSearchResults(response);
        
      },
      error:(error)=>{
         console.log(error)
      }
    })
    
  }

  FormMethod() {
    if(!this.Id && !this.FileName && !this.Status && !this.FromDate && !this.ToDate){
      this.snackBar.open("No Filter Applied", "" ,{ duration: 2000 });
    }else{
    const token = localStorage.getItem("jwt");
    this.apiService.searchByField(token, this.FileName, this.Status, this.Id, this.FromDate, this.ToDate)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.sharedDataService.updateSearchResults(response);
        },
        error: (error) => {
          if (error.status === 400) {
            // Handle 'No Record Found' by updating with an empty array.
            console.warn("No records found.");
            this.sharedDataService.updateSearchResults([]);
          } else {
            console.error('Failed', error);
          }
        }
      });
    }
  }
}
