import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  logIn() {
    // ✅ Check against hardcoded credentials
    if (this.email === 'smithrachelc@gmail.com' && this.password === 'Tucker@1uno!') {
      this.router.navigate(['/dashboard']); // ✅ Use your correct dashboard route
    } else {
      this.errorMessage = 'Incorrect email or password.';
    }
  }
}
