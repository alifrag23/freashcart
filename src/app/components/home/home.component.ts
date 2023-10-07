import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/interfaces/products';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { Categories } from 'src/app/interfaces/categories';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WashlistService } from 'src/app/core/services/washlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, CutTextPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allProduct: Product[] = [];
  allCategory: Categories[] = [];
  washListData: any[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WashlistService: WashlistService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCtegory();
    this.getWashlist();
  }

  // ?=========================================>>get All Products

  getAllProducts(): void {
    this._ProductsService.getAllProduct().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.allProduct = resp.data;
        // console.log(this.allProduct);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // ?=========================================>>get All Category

  getAllCtegory(): void {
    this._ProductsService.getAllCtegory().subscribe({
      next: (resp) => {
        // console.log(resp.data);
        this.allCategory = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // ?=========================================>>Add To Cart
  addCart(keyword: string, elemnt: HTMLButtonElement): void {
    this._Renderer2.setAttribute(elemnt, 'disabled', 'true');
    this._CartService.addCart(keyword).subscribe({
      next: (resp) => {
        console.log(resp);
        this._CartService.cartNumber.next(resp.numOfCartItems)
          this._toastr.success(resp.message + ' 🚛');
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
    });
  }

  // ?=========================================>>Add To WashList
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

  // ?=========================================>>remove To WashList
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
  // ?=========================================>>get  WashList
  getWashlist(): void {
    this._WashlistService.getWishlist().subscribe({
      next: (resp) => {
        // console.log(resp.data);
        // console.log(newData);
        const newData = resp.data.map((item: any) => item._id);
        this.washListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // !todo=========================================>>Category Slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  // !todo=========================================>>Main Slider

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 800,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
}
