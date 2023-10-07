import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password: any;
  show = false;
  //
  errorMessage: string = '';
  errorMessageState: boolean = false;
  loadRequest: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
    this.password = 'password';
  }
  onClick(element:any) {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9!@#$%*]{6,}$/),
    ]),
  });
  handelLogin(LoginForm: FormGroup): void {
    this.loadRequest = true;
    // console.log(LoginForm.value);
    if (this.LoginForm.valid) {
      this._AuthService.loginForm(LoginForm.value).subscribe({
        next: (resp) => {
          // console.log(resp);
          this.loadRequest = false;

          if ((resp.message = 'success')) {
            localStorage.setItem('_token', resp.token);
            this._Router.navigate(['/home']);
            this._AuthService.userData();
          }
        },
        error: (err) => {
          // console.log(err);
          this.loadRequest = false;

          this.errorMessage = err.error.message;
          this.errorMessageState = true;
        },
      });
    }
  }
}
