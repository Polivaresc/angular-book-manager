import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { User } from '../../user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  } 

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    const user: User = { username: username, password: password};

    if (this.userService.login(user)) {
      this.loginError = null;
      this.router.navigate(['/books']);
    } else {
      this.loginError = 'Incorrect user or password';
    }
  }
}
