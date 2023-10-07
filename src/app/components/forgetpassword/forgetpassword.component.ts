import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService } from 'src/app/core/services/password.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(
    private _PasswordService: PasswordService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  userEmail: string = '';

  //?==================================================forgetPassForm
  forgetPassForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handelForgetPass(forgetPassForm: FormGroup): void {
    this.userEmail = forgetPassForm.value.email;
    console.log(this.userEmail);
    console.log(forgetPassForm.value);
    this._PasswordService.forgetPass(forgetPassForm.value.email).subscribe({
      next: (resp) => {
        this.toastr.success(resp.message);
        console.log(resp);
        if (resp.statusMsg == 'success') {
          this.step1 = false;
          this.step3 = false;
          this.step2 = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      },
    });
  }
  //?==================================================restCodeForm

  restCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  handelResetCode(restCodeForm: FormGroup): void {
    console.log(restCodeForm.value.resetCode);
    this._PasswordService.resetCode(restCodeForm.value.resetCode).subscribe({
      next: (resp) => {
        console.log(resp);
        if ((resp.status = 'Success')) {
          this.toastr.success(resp.status);
          this.step1 = false;
          this.step2 = false;
          this.step3 = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      },
    });
  }
  //?==================================================newPassForm

  newPassForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9!@#$%*]{6,}$/),
    ]),
  });
  handelNewPass(newPassForm: FormGroup): void {
    console.log(newPassForm.value);
    this._PasswordService
      .newPass(this.userEmail, newPassForm.value.newPassword)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.token !== null) {
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  //?==================================================
}
