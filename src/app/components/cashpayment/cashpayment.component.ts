import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cashpayment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cashpayment.component.html',
  styleUrls: ['./cashpayment.component.scss'],
})
export class CashpaymentComponent implements OnInit {
  cartId!: any;

  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ActivatedRoute: ActivatedRoute,
    private _toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (resp) => {
        this.cartId = resp.get('id');
      },
    });
  }

  addressInfo: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });
  getAddressInfo(addressInfo: FormGroup, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    console.log(addressInfo.value);
    this._CartService.payCash(this.cartId, addressInfo.value).subscribe({
      next: (resp) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        console.log(resp);
        if (resp.status == 'success') {
          this._toastr.success(resp.status);
          this._Router.navigate(['/allorders']);
        }
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');

        console.log(err);
      },
    });
  }
}
