import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) {}

  getAllProduct(pageNumber:number=1,limit:number=20): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/api/v1/products?page=${pageNumber} &limit=${limit}`);
  }


  getSpecificProduct(productId: string): Observable<any> {
    return this._HttpClient.get(
      this.baseUrl + `/api/v1/products/${productId} `
    );
  }
  getAllCtegory(): Observable<any> {
    return this._HttpClient.get(this.baseUrl+'/api/v1/categories')
  }
}
