import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  baseUrl: string = 'https://route-ecommerce.onrender.com';
  constructor(private _HttpClient: HttpClient) {}
  forgetPass(email: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/forgotPasswords',
      { email: email }
    );
  }
  resetCode(resetCod: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/verifyResetCode',
      { resetCode: resetCod }
    );
  }
  newPass(email: string, newPassword: string): Observable<any> {
    return this._HttpClient.put(this.baseUrl + '/api/v1/auth/resetPassword', {
      email: email,
      newPassword: newPassword,
    });
  }

  updatePass(userDAta:object): Observable<any>{
    return this._HttpClient.put(this.baseUrl + '/api/v1/users/updateMe/',{userDAta});
  }
}
