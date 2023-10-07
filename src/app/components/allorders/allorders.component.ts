import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {
  userId: any = '';
  allOrder: any =[]
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this.getUserId();
    this.getAllOrder(this.userId);
  }
  getUserId(): void {
    this._AuthService.userData()
    this.userId = this._AuthService.userId;
    // console.log(this.userId);
  }
  getAllOrder(keyword:string): void {
    this._CartService.getAllOreder(keyword).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.allOrder=resp
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
