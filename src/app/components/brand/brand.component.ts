import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  brandData: any = [];
  constructor(private _CategoriesServic: CategoriesService){}
  ngOnInit(): void {this.getAllBrand() }
  getAllBrand(): void{
    this._CategoriesServic.getAllBrand().subscribe({
      next: (resp) => {
        console.log(resp);
        this.brandData=resp.data
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
