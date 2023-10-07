import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  categoryId: any = '';
  dataOfCategory!: any;
  dataOfSupCategory!: any;
  constructor(
    private _CategoriesService: CategoriesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getIdCategory();
    this.getSpecificCategory(this.categoryId);
    this.getAllSpecificProduct(this.categoryId)
  }
  getIdCategory(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (resp) => {
        this.categoryId = resp.get('id');
      },
    });
  }
  getSpecificCategory(keyword: string): void {
    this._CategoriesService.getSpecificCateg(keyword).subscribe({
      next: (resp) => {
        console.log(resp);
        this.dataOfCategory = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllSpecificProduct(keyword:string): void {
     this._CategoriesService.getSupProduct(keyword).subscribe({
      next: (resp) => {
         console.log(resp);
         this.dataOfSupCategory=resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
