import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('createTooltip', [
      state('void', style({ width: 0, height: 0, overflow: 'hidden' })),
      state(
        '*',
        style({
          maxWidth: 'max-content',
          maxHeight: 'max-content',
          overflow: 'hidden',
        })
      ),
      transition('void<=>*', animate(100)),
    ]),
  ],
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() public text!: string;
  @Input() public topInPx: number;
  @Input() public leftInPx: number;
  @Input() public content: TemplateRef<any>;
  private element = inject(ElementRef);
  public state: string = 'void';
  public get positionFromTop(): string {
    return `${this.topInPx}px`;
  }
  public get positionFromLeft(): string {
    return `${this.leftInPx}px`;
  }

  ngOnInit(): void {
    this.state = '*';
  }
  ngOnDestroy(): void {
    this.state = 'void';
  }
  getHeight(): number {
    return this.element.nativeElement.offsetHeight;
  }
  getWidth(): number {
    return this.element.nativeElement.offsetWidth;
  }
}
