import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordService } from 'src/app/core/services/password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss'],
})
export class UpdatePassComponent {
  errorMessage: string = '';
  errorMessageState: boolean = false;
  constructor(
    private _PasswordService: PasswordService,
    private _Router: Router
  ) {}
  updateForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9!@#$%*]{6,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9!@#$%*]{6,}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  handelUpdate(updateForm: FormGroup) {
    console.log(updateForm.value);
    this._PasswordService.updatePass(updateForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.message == 'success') {
          //
          // localStorage.removeItem('_token');
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.errorMessageState = true;
      },
    });
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
