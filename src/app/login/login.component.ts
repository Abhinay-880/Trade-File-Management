import { Component, HostListener } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  userCheck: boolean = false;
  passCheck: boolean = false;
  usernamepasswordCheck: boolean = false;

  constructor(private apiService: ApiService, private route: Router, private snackBar: MatSnackBar) { }

  // Check if username is provided.
  usernameCheck() {
    if (this.username.trim() === "") {
      this.userCheck = true;
    } else {
      this.userCheck = false;
    }
  }

  // Check if password is provided.
  passwordCheck() {
    if (this.password.trim() === "") {
      this.passCheck = true;
    } else {
      this.passCheck = false;
    }
  }

  // Global key listener to check for Enter key press.
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Determine the active element.
      const activeTag = document.activeElement?.tagName.toLowerCase() || '';
      // If no input, textarea, select or button is focused, trigger login.
      if (!['input', 'textarea', 'select', 'button'].includes(activeTag)) {
        event.preventDefault();
        this.triggerLogin();
      }
    }
  }

  // Calls login() manually when Enter is pressed without focus.
  triggerLogin() {
    this.login();
  }

  // Login function that calls the API.
  // No event parameter is used here because the form (submit) also calls login() directly.
  login() {
    if(this.username === ""){
      this.userCheck = true;
      return
    }
    else if(this.password === ""){
      this.passCheck = true;
      return
    }else{
      this.userCheck = false;
      this.passCheck = false;
    console.log(this.username);
    console.log(this.password);

    this.apiService.login(this.username, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.snackBar.open("Login Successful!", "Close", { duration: 2000 });
          localStorage.setItem("username", this.username);
          localStorage.setItem("jwt", response.body.jwt);
          setTimeout(() => {
            this.route.navigate(["/home"]).then(() => {
              window.location.reload();
            });
          }, 800);
        }
      },
      error: (error) => {
        console.error("Login Error:", error.status);
        if (error.status === 502) {
          this.usernamepasswordCheck = true;
          this.snackBar.open("Invalid username or password. Please try again.", "Close", { duration: 2000 });
        }
      }
    });
  }
  }

  // Navigate to the sign-up/registration page.
  signUp() {
    this.route.navigate(["/register"]);
  }
}
