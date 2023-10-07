import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true,
})
export class CutTextPipe implements PipeTransform {
  transform(text: string, textLimit: number): string {
    return text.split(' ').slice(0,textLimit).join('');
  }
}
