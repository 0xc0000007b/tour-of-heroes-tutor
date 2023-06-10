import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../svg.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private svgService = inject(SvgService);
  @Input() name: string;
  public svg: SafeHtml;

  ngOnInit() {
    this.svgService.getIcon(this.name).subscribe((svg) => {
      this.svg = this.sanitizer.bypassSecurityTrustHtml(svg as string);
    });
  }
}
