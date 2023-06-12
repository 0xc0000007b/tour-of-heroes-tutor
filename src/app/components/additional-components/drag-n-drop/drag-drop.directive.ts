import {
  AfterViewInit, ContentChildren,
  Directive,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener, inject,
  Output,
} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

interface Position {
  x: number
  y: number
}
@Directive({
  selector: '[appDragDrop], [appDroppable]',
  standalone: true
})
export class DragDropDirective{
  private sanitizer = inject(DomSanitizer)
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('style')
  get uerSelectAction(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.element.nativeElement.style.userSelect = 'none')
  }
  pointerId?: number;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging = false;

  constructor(public element: ElementRef) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    // added after YouTube video: ignore right-click
    if (event.button !== 0) {
      return;
    }

    this.pointerId = event.pointerId;

    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.dragMove.emit(event);
  }

  // added after YouTube video: pointercancel
  @HostListener('document:pointercancel', ['$event'])
  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }

}
