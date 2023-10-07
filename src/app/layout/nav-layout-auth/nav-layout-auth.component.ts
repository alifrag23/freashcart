import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAuthComponent } from 'src/app/components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-nav-layout-auth',
  standalone: true,
  imports: [CommonModule, NavAuthComponent, RouterOutlet,FooterComponent],
  templateUrl: './nav-layout-auth.component.html',
  styleUrls: ['./nav-layout-auth.component.scss'],
})
export class NavLayoutAuthComponent {}
