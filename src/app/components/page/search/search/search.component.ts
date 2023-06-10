import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../../additional-components/theme-changer/heroes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroInterface } from '../../../heroes/interfaces/hero.interface';
import { SearchPipe } from '../serach.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TooltipDirective } from '../../../additional-components/tooltip.directive';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    RouterLink,
    FormsModule,
    TooltipDirective,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('search', [
      state(
        'clicked',
        style({
          width: '90%',
          position: 'absolute',
          top: '50%',
          right: 50,
          left: 50,
        })
      ),
      transition('void=>clicked', animate(200)),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public state = 'void';
  private heroesService = inject(HeroesService);
  private heroes$ = this.heroesService.getAllHeroes();
  public searchQueryString!: string;
  public heroes = toSignal(this.heroes$, {
    initialValue: [] as HeroInterface[],
  });

  setStyles() {
    this.state = 'clicked';
  }
}
