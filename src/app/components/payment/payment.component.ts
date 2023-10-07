import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cartId!: any;
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _Renderer2: Renderer2
  ) {}
  addressInfo: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (resp) => {
        this.cartId = resp.get('id');
      },
    });
  }
  getAddressInfo(addressInfo: FormGroup, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element,'disabled','true')
    // console.log(addressInfo.value);
    this._CartService.payment(this.cartId, addressInfo.value).subscribe({
      next: (resp) => {
    this._Renderer2.removeAttribute(element,'disabled')

        // console.log(resp);
        if ((resp.status = 'success')) {
          window.open(resp.session.url, '_self');
        }
      },
      error: (err) => {
    this._Renderer2.removeAttribute(element, 'disabled');

        console.log(err);
      },
    });
  }
}
