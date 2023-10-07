import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://route-ecommerce.onrender.com';

  constructor(private _HttpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  // cartNumber:number=0
  addCart(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/api/v1/cart', {
      productId: productId,
    });
  }
  displayCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/api/v1/cart');
  }
  deletProduct(prductId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart/${prductId}`);
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + '/api/v1/cart');
  }
  changeCount(productId: string, count: string): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/api/v1/cart/${productId}`, {
      count: count,
    });
  }
  payment(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl +
        `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress }
    );
  }
  payCash(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `/api/v1/orders/${cartId}`, {
      shippingAddress: shippingAddress,
    });
  }
  getAllOreder(userId: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/api/v1/orders/user/${userId}`);
  }
}
