import { Pipe, PipeTransform, WritableSignal } from '@angular/core';
import { HeroInterface } from '../../heroes/interfaces/hero.interface';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(heroes: HeroInterface[], value: string): HeroInterface[] | null {
    return value
      ? heroes.filter((hero) => hero.name.toLowerCase().includes(value))
      : null;
  }
}
