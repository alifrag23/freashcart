import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productOfCart: any = null;
  constructor(
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.displayCart();
  }
  //?=========================================================>>Display Cart
  displayCart(): void {
    this._CartService.displayCart().subscribe({
      next: (resp) => {
        console.log(resp);
        // console.log(resp.data);
        this.productOfCart = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //?=========================================================>>Remove Product From Cart

  removeProduct(keyword: string): void {
    this._CartService.deletProduct(keyword).subscribe({
      next: (resp) => {
        console.log(resp);
        this.productOfCart = resp.data;
        this.displayCart();
   this._CartService.cartNumber.next(resp.numOfCartItems);      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //?=========================================================>>Clear Cart

  claerCart(): void {
    this._CartService.clearCart().subscribe({
      next: (resp) => {
        this._toastr.error('Your Cart Is Empty Now 😥');
        console.log(resp);
        this.productOfCart = {};
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //?=========================================================>>Change Count Of Products
  changeCount(count: any, id: string): void {
    if (count !== 0) {
      this._CartService.changeCount(id, count).subscribe({
        next: (resp) => {
          console.log(resp);
          this.productOfCart = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this._toastr.warning('Error Action');
    }
  }
}
