import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WashlistService } from 'src/app/core/services/washlist.service';

// import { ProductDetails } from 'src/app/interfaces/product-details';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = null;
  productId: any = '';


  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WashlistService: WashlistService
  ) {}
  ngOnInit(): void {
    this.getId();
    this.getProductDetails(this.productId);
  }
  getId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (resp) => {
        // console.log(resp.get('id'));
        this.productId = resp.get('id');
      },
    });
  }
  getProductDetails(keyword: string): void {
    this._ProductsService.getSpecificProduct(keyword).subscribe({
      next: (resp) => {
        // console.log(resp.data);
        this.productDetails = resp.data;
        // console.log(this.productDetails);
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
   this._CartService.cartNumber.next(resp.numOfCartItems);
        // console.log(resp);
        this._toastr.success(resp.message + ' 🚛');
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elemnt, 'disabled');
      },
    });
  }

  //?=========================>>slider of Product Details >>=========================
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
