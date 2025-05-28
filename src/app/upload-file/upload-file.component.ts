import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  isUploading = false;
  selectedFile: File | null = null;

  constructor(private apiService: ApiService, private router: Router,private snackBar: MatSnackBar) {
    // Check if the JWT exists; if not, redirect to login.
    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) {
      alert('Please login.');
      this.router.navigate(['/login']);
    }
  }

  // Triggered when the file input changes.
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  // Triggered when the form is submitted.
  uploadFile(event: Event): void {
    // Prevent the browser's default form submission behavior.
    event.preventDefault();  

    const jwtToken = localStorage.getItem('jwt');
    if (!this.selectedFile) {
      console.error('No file selected. Please choose a file before uploading.');
      this.snackBar.open("No file selected. Please choose a file to upload.", "OK", { duration: 3000 });
      return;
    }

    console.log('Uploading file:', this.selectedFile);
    this.isUploading = true;

    this.apiService.uploadFile(this.selectedFile, jwtToken).subscribe(
      (response: HttpResponse<any>) => {
        console.log('File uploaded successfully:', response.status);
        this.isUploading = false;
        this.snackBar.open("File uploaded successfully.", "OK", { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.log(error.status)
        console.error('File upload failed:', error);
        this.snackBar.open("File upload fail.", "OK", { duration: 3000 });
        this.isUploading = false;
      }
    );
  }

  // Global listener for Enter key presses.
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const activeTag = document.activeElement?.tagName.toLowerCase() || '';
      if (!['input', 'textarea', 'select', 'button'].includes(activeTag)) {
        event.preventDefault();
        this.triggerSubmit();
      }
    }
  }

  // Helper to trigger upload using a dummy event.
  triggerSubmit(): void {
    const dummyEvent = { preventDefault: () => {} } as Event;
    this.uploadFile(dummyEvent);
  }
}
