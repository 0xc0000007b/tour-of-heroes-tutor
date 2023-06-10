import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../additional-components/theme-changer/heroes.service';
import { HeroInterface } from '../interfaces/hero.interface';
import { MessagesComponent } from '../../messages/messages/messages.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestHeroInterface } from '../interfaces/request-hero.interface';
import { MessagesService } from '../../messages/services/messages.service';
import { TooltipDirective } from '../../additional-components/tooltip.directive';

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [
    CommonModule,
    MessagesComponent,
    ReactiveFormsModule,
    TooltipDirective,
  ],
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.scss'],
})
export class HeroEditorComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroesService);
  public hero = signal({} as HeroInterface);
  private cdr = inject(ChangeDetectorRef);
  private messagesService = inject(MessagesService);
  private builder = inject(FormBuilder);
  public showForm: boolean = false;
  public form = this.builder.group({
    name: '',
    superPower: '',
  });
  saveHero(): void {
    this.heroService.saveHero(
      this.hero().id,
      this.form.value as RequestHeroInterface
    );
    this.messagesService.postMessage('[Hero Editor] Hero successfully updated');
    this.showForm = false;
  }
  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.heroService
        .getHeroById(id)
        .subscribe((res) => (this.hero = signal(res)));
      this.cdr.detectChanges();
    });
  }
}
