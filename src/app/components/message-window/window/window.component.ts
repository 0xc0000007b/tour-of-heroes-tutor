import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizableDirective } from './directives/resizable.directive';
import { DragNdropDirective } from './directives/drag-ndrop.directive';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule, ResizableDirective, DragNdropDirective],
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
  public windowId: number;
  public widthInPx: number;
  public heightInPx: number;
  public content: TemplateRef<any>;

  public get width(): string {
    return `${this.widthInPx}px`;
  }
  public get height(): string {
    return `${this.heightInPx}px`;
  }
}
