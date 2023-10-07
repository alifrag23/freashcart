import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  allCategories: any = [];
  deleteState: boolean = false;

  constructor(private _CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.deleteState = true;
    this.getCategories();
  }
  getCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (resp) => {
        this.deleteState = false;
        console.log(resp.data);
        this.allCategories = resp.data;
      },
    });
  }
}
