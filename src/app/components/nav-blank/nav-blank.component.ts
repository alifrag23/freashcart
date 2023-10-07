import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  cartCount: number = 0;
  constructor(
    private _Router: Router,
    private _Renderer2: Renderer2,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (x) => {
        this.cartCount = x;
      },
    });
    this._CartService.displayCart().subscribe({
      next: (resp) => {
        this._CartService.cartNumber.next(resp.numOfCartItems);
      },
    });
  }

  @ViewChild('navBar') navElement!: ElementRef;
  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 300) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }

  handelSignOut(): void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login']);
  }
}
