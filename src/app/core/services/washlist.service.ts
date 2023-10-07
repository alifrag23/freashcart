import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WashlistService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) {}
  addToWashlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/wishlist',
      {
        productId: productId,
      }
    );
  }
  removeFromWashlist(productId: string): Observable<any> {
    return this._HttpClient.delete(
      this.baseUrl + `/api/v1/wishlist/${productId}`
    );
  }
  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/api/v1/wishlist');
  }
}
