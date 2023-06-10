import { Component, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroInterface } from '../interfaces/hero.interface';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeroesService } from '../../additional-components/theme-changer/heroes.service';
import { MessagesService } from '../../messages/services/messages.service';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() hero!: HeroInterface;
  private heroService = inject(HeroesService);
  private messages = inject(MessagesService);
  deleteHero(id: number) {
    this.heroService.deleteHeo(id);
    this.messages.postMessage('[Card] Hero successfully deleted');
  }
}
