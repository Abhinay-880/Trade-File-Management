import { Component, HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  userCheck: boolean = false;
  passCheck: boolean = false;
  usernamepasswordCheck: boolean = false;
  role: string = "Role_user";
  adminPass: string = "";
  admin_err_call: boolean = false;
  adminPassword: string = "Admin@123";
  UserAlreadyCheck: boolean = false;

  // Flags controlling which form is visible:
  showRegister: boolean = true;
  showAdmin: boolean = false;

  constructor(private apiService: ApiService, private route: Router, private snackBar: MatSnackBar) { }

  // Global key listener (for Enter key) if no control is focused.
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const activeTag = document.activeElement?.tagName.toLowerCase() || '';
      if (
        this.showRegister &&
        !['input', 'textarea', 'select', 'button'].includes(activeTag)
      ) {
        event.preventDefault();
        this.triggerSubmit();
      }
      if (
        this.showAdmin &&
        !['input', 'textarea', 'select', 'button'].includes(activeTag)
      ) {
        event.preventDefault();
        this.triggerAdminSubmit();
      }
    }
  }

  triggerSubmit() {
    const dummyEvent = { preventDefault: () => { } };
    this.register(dummyEvent);
  }

  triggerAdminSubmit() {
    this.AdminRegister();
  }

  // Validate Username
  usernameCheck() {
    if (this.username.trim() === "") {
      this.userCheck = true;
    } else {
      this.userCheck = false;
      this.UserAlreadyCheck = false;
    }
  }

  // Validate Password
  passwordCheck() {
    if (this.password.trim() === "") {
      this.passCheck = true;
    } else {
      this.passCheck = false;
    }
  }



  // Validate Admin Password
  admin_method() {
    if (this.adminPass.trim() === "") {
      this.admin_err_call = true;
    } else {
      this.admin_err_call = false;
    }
  }

  // Switch back to the registration form.
  redirect() {
    this.showRegister = true;
    this.showAdmin = false;
  }

  // Navigate to login.
  signIp() {
    this.route.navigate(["/login"]);
  }

  // Registration function.
  register(event: any) {
    event.preventDefault();

    if (this.username.trim() === "") {
      this.userCheck = true;
      return;
    }
    if (this.password.trim() === "") {
      this.passCheck = true;
      return;
    }
    // If the selected role is admin, switch forms.
    if (this.role === "Role_admin") {
      setTimeout(() => {
        this.showAdmin = true;
        this.showRegister = false;
      }, 0);
      return;
    }

    // Otherwise, call the API service for a standard user registration.
    this.apiService.register(this.username, this.password, this.role).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log("success");
          this.snackBar.open("Register Succeffully, Please login in", "OK", { duration: 3000 });
          setTimeout(() => this.route.navigate(["/login"]), 3000);
        }
      },
      error: (error) => {
        if (error.status === 200) {
          console.log("success");
          this.snackBar.open("Register Succeffully, Please login in", "OK", { duration: 3000 });
          setTimeout(() => this.route.navigate(["/login"]), 2000);
        }
        console.log(error.status);
        if (error.status === 400) {
          this.UserAlreadyCheck = true;
          this.usernamepasswordCheck = true;
        } else {
          this.UserAlreadyCheck = false;
        }
      }
    });
  }

  // Admin registration function.
  AdminRegister() {
    if (this.adminPass === this.adminPassword) {
      this.admin_err_call = false;
      this.apiService.register(this.username, this.password, this.role).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log("success");
            this.snackBar.open("Register Succeffully, Please login in", "OK", { duration: 3000 });
            setTimeout(() => this.route.navigate(["/login"]), 2000);
          }
        },
        error: (error) => {
          if (error.status === 200) {
            console.log("success");
            this.snackBar.open("Register Succeffully, Please login in", "OK", { duration: 3000 });
            setTimeout(() => this.route.navigate(["/login"]), 900);
          }
          console.log(error.status);
          if (error.status === 400) {
            this.UserAlreadyCheck = true;
            this.usernamepasswordCheck = true;
          } else {
            this.UserAlreadyCheck = false;
          }
        }
      });
    } else {
      
      this.snackBar.open("wrong credintials", "OK", { duration: 2000 });
    }
  }
}
