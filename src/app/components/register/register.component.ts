import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormControlOptions,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    provideAnimations(),
    //  provideToastr(),
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  password: any;
  show = false;
  //
  errorMessage: string = '';
  errorMessageState: boolean = false;
  loadRequest: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.password = 'password';
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  //
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9!@#$%*]{6,}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        (Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)),
      ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  handelRegister(registerForm: FormGroup): void {
    this.loadRequest = true;
    // console.log(registerForm.value);
    // console.log(registerForm);
    if (this.registerForm.valid) {
      this._AuthService.registerForm(registerForm.value).subscribe({
        next: (data) => {
          this.loadRequest = false;
          // console.log(data);
          this._Router.navigate(['/login']);
          // this.toastr.success('Hello world!');
        },
        error: (err) => {
          this.loadRequest = false;

          console.log(err);
          this.errorMessage = err.error.message;
          this.errorMessageState = true;
        },
      });
    }
  }
  confirmPassword(group: FormGroup): void {
    const pass = group.get('password');
    const rePass = group.get('rePassword');
    if (rePass?.value == '') {
      rePass.setErrors({ requerd: true });
    } else if (rePass?.value != pass?.value) {
      rePass?.setErrors({ misMatch: true });
    }
  }
}
