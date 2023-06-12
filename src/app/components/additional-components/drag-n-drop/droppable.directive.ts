import {Directive, HostListener, inject} from '@angular/core';
import {DndService} from "./dnd.service";

@Directive({
  selector: '[appDroppable]',
  standalone: true
})
export class DroppableDirective {
private droppableService = inject(DndService)


  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent): void {
    this.droppableService.onDragStart(event);
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    this.droppableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    this.droppableService.onDragEnd(event);
  }

}
