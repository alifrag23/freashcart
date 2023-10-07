import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WashlistService } from 'src/app/core/services/washlist.service';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
@Component({
  selector: 'app-washlist',
  standalone: true,
  imports: [CommonModule, RouterLink,CutTextPipe],
  templateUrl: './washlist.component.html',
  styleUrls: ['./washlist.component.scss'],
})
export class WashlistComponent implements OnInit {
  allProduct: any;
  constructor(
    private _WashlistService: WashlistService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    this.getWasteList();
  }
  getWasteList(): void {
    this._WashlistService.getWishlist().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.allProduct = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(keyword: string, elemnt: any): void {
    this._Renderer2.setAttribute(elemnt, 'disabled', 'true');
    this._CartService.addCart(keyword).subscribe({
      next: (resp) => {
        // console.log(resp);
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
  removeFromWashlist(keyWord: string): void {
    this._WashlistService.removeFromWashlist(keyWord).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastr.error(resp.message + '💔');
        this.getWasteList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
