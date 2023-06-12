import {
  AfterContentInit,

  ContentChildren,
  Directive,
  EventEmitter, forwardRef, HostBinding,

  Output,
  QueryList
} from '@angular/core';
import {DragDropDirective} from "./drag-drop.directive";

import {DropEventData} from "./interfaces/drop-event-data.interface";
const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  )
};

const hCenter = (rect: ClientRect): number => {
  return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};
@Directive({
  selector: '[appListSortable]',
  standalone: true,
  providers: [
    {provide: DragDropDirective, useExisting: forwardRef(() => ListSortableDirective)}
  ]
})
export class ListSortableDirective extends DragDropDirective {
  @HostBinding('class.sortable')
  get setSortable(): boolean {
    return true
  }

}
@Directive({
  selector: '[appSortable]',
  standalone: true,

})
export class SortableDirective  implements AfterContentInit {
  @ContentChildren(ListSortableDirective) sortables: QueryList<ListSortableDirective>;

  @Output() sort = new EventEmitter<DropEventData>();

  private clientRects: ClientRect[];

  ngAfterContentInit(): void {
    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: ListSortableDirective, event: PointerEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ?
          rect.left < currentRect.left :
          rect.top < currentRect.top;

        // refactored this part a little bit after my Youtube video
        // for improving readability
        const moveBack = isBefore && (isHorizontal ?
            event.clientX < hCenter(rect) :
            event.clientY < vCenter(rect)
        );

        const moveForward = !isBefore && (isHorizontal ?
            event.clientX > hCenter(rect) :
            event.clientY > vCenter(rect)
        );

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });

          return true;
        }

        return false;
      });
  }
}
