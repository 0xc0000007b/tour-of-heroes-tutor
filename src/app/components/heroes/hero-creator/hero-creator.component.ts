import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../additional-components/theme-changer/heroes.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestHeroInterface } from '../interfaces/request-hero.interface';
import { MessagesComponent } from '../../messages/messages/messages.component';
import { MessagesService } from '../../messages/services/messages.service';

@Component({
  selector: 'app-hero-creator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessagesComponent],
  templateUrl: './hero-creator.component.html',
  styleUrls: ['./hero-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCreatorComponent {
  private heroService = inject(HeroesService);
  private messagesService = inject(MessagesService);
  private builder = inject(FormBuilder);
  public form = this.builder.group({
    name: '',
    superPower: '',
  });
  saveHero(): void {
    this.heroService.createHero(this.form.value as RequestHeroInterface);
    this.messagesService.postMessage(
      '[Hero Creator] Hero successfully created'
    );
  }
}
