import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/products';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(Product: Product[], text: string): Product[] {
    return Product.filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
