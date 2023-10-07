import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.scss'],
})
export class SpecificBrandComponent implements OnInit {
  barndData!: any;
  barndId: string = '';
  constructor(
    private _CategoriesService: CategoriesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getBarndId();
    this.getspcificBrand(this.barndId);
  }
  getBarndId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (resp: any) => {
        this.barndId = resp.get('id');
      },
    });
  }
  getspcificBrand(keyword: string): void {
    this._CategoriesService.getSpecificBrand(keyword).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.barndData = resp.data;
        // console.log(this.barndData.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
