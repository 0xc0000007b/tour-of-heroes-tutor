import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Inject,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Subscription, takeUntil } from 'rxjs';

@Directive({
  selector: '[resizable]',
  standalone: true,
})
export class ResizableDirective implements OnInit, OnDestroy {
  private resizeInverted = false;
  private subscription = new Subscription();
  private startX: number;
  private startY: number;
  private startWidth: number;
  private startHeight: number;
  private startDistance: number;
  private scaleFactor = 0.03;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement;

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    this.subscription.add(
      mousedown$.subscribe((startEvent) => {
        this.startX = startEvent.clientX;
        this.startY = startEvent.clientY;
        this.startWidth = parseInt(getComputedStyle(element).width, 10);
        this.startHeight = parseInt(getComputedStyle(element).height, 10);

        const rect = element.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        this.startDistance =
          Math.sqrt(
            Math.pow(startEvent.clientX - center.x, 2) +
              Math.pow(startEvent.clientY - center.y, 2)
          ) * (this.resizeInverted ? -1 : 1); // учитываем масштабирование в обратную сторону

        startEvent.preventDefault();

        mousemove$.pipe(takeUntil(mouseup$)).subscribe((moveEvent) => {
          const rect = element.getBoundingClientRect();
          const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          const distance =
            Math.sqrt(
              Math.pow(moveEvent.clientX - center.x, 2) +
                Math.pow(moveEvent.clientY - center.y, 2)
            ) * (this.resizeInverted ? -1 : 1); // учитываем масштабирование в обратную сторону

          if (
            (distance > this.startDistance && !this.resizeInverted) ||
            (distance < this.startDistance && this.resizeInverted)
          ) {
            // Изменяем размер элемента на основе полученных размеров
            const diff = (distance - this.startDistance) * this.scaleFactor;
            const newWidth = Math.floor(this.startWidth * (1 + diff));
            const newHeight = Math.floor(this.startHeight * (1 + diff));
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
