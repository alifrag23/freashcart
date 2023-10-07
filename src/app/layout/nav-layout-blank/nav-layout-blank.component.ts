import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-nav-layout-blank',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './nav-layout-blank.component.html',
  styleUrls: ['./nav-layout-blank.component.scss'],
})
export class NavLayoutBlankComponent {
  scrollUp(): void {
window.scroll(0,0)
  }
}
