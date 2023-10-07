import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/interfaces/products';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WashlistService } from 'src/app/core/services/washlist.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
// import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    CutTextPipe,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  text: string = '';
  allProduct: Product[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;
  washListData: any[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WashlistService: WashlistService
  ) {}
  ngOnInit(): void {
    this.getAllProducts(1, 40);
    this.getWashlist();
  }
  getAllProducts(key1: number, key2: number): void {
    this._ProductsService.getAllProduct(key1, key2).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.allProduct = resp.data;
        // console.log(this.allProduct);
        this.pageSize = resp.metadata.limit;
        this.currentPage = resp.metadata.currentPage;
        this.total = resp.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addCart(keyword: string, elemnt: HTMLButtonElement): void {
    this._Renderer2.setAttribute(elemnt, 'disabled', 'true');
    this._CartService.addCart(keyword).subscribe({
      next: (resp) => {
        console.log(resp);
        this._CartService.cartNumber.next(resp.numOfCartItems);
        this._toastr.success(resp.message + ' 🚛');
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
    });
  }

  addToWashList(keyWord: string): void {
    this._WashlistService.addToWashlist(keyWord).subscribe({
      next: (resp) => {
        // console.log(resp);
        this._toastr.success(resp.message + '💚');
        this.washListData = resp.data;
        // console.log('add', this.washListData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromWashlist(keyWord: string): void {
    this._WashlistService.removeFromWashlist(keyWord).subscribe({
      next: (resp) => {
        // console.log(resp);
        this._toastr.error(resp.message + '💔');
        this.washListData = resp.data;
        // console.log('remove', this.washListData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getWashlist(): void {
    this._WashlistService.getWishlist().subscribe({
      next: (resp) => {
        // console.log(resp.data);
        const newData = resp.data.map((item: any) => item._id);
        console.log(newData);
        // this.washListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
