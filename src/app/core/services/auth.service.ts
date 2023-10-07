import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInformation: any = {};
  userId: any = '';
  baseUrl = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) {}
  registerForm(registerData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registerData
    );
  }
  loginForm(loginData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginData
    );
  }
  userData(): void {
    const encode = localStorage.getItem('_token');
    if (encode) {
      const decode = jwtDecode(encode);
      console.log(decode);
      this.userInformation = decode;
      this.userId = this.userInformation.id;
    }
  }
}
