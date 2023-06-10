import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchPipe } from '../search/serach.pipe';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search/search.component';
import { ThemeChangerService } from '../../additional-components/theme-changer/theme-changer.service';
import { PersistanceService } from '../../additional-components/theme-changer/persistance.service';
import { IconComponent } from '../../additional-components/svg/icon/icon.component';
import { SvgService } from '../../additional-components/svg/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { TooltipDirective } from '../../additional-components/tooltip.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SearchPipe,
    FormsModule,
    SearchComponent,
    IconComponent,
    TooltipDirective,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ThemeChangerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges {
  private themeService = inject(ThemeChangerService);
  private persistanceService = inject(PersistanceService);
  private cdr = inject(ChangeDetectorRef);
  public theme: string;

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.theme = theme;
    this.persistanceService.saveItem('theme', theme);
  }
  ngOnInit() {
    this.theme = this.persistanceService.getItem('theme') as string;
    this.themeService.setTheme(this.theme as string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.cdr.detectChanges();
      this.theme = this.persistanceService.getItem('theme') as string;
    }
  }
}
