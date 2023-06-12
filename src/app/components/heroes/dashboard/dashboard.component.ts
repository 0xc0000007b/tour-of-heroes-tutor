import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroInterface } from '../interfaces/hero.interface';
import { HeroCardComponent } from '../hero-card/hero-card.component';

import { HeroesService } from '../../additional-components/theme-changer/heroes.service';
import { Observable } from 'rxjs';
import { MessagesService } from '../../messages/services/messages.service';
import { MessagesComponent } from '../../messages/messages/messages.component';
import { TooltipDirective } from '../../additional-components/tooltip.directive';
import { DragNdropDirective } from '../../message-window/window/directives/drag-ndrop.directive';
import { ResizableDirective } from '../../message-window/window/directives/resizable.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeroCardComponent,
    MessagesComponent,
    TooltipDirective,
    DragNdropDirective,
    ResizableDirective,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private heroService = inject(HeroesService);
  private messageService = inject(MessagesService);
  private heroes$: Observable<HeroInterface[]> =
    this.heroService.getAllHeroes();
  public heroes = signal(this.heroes$);
  ngOnInit(): void {
    this.messageService.postMessage('[Dashboard] Heroes Successfully loaded');
  }
}
