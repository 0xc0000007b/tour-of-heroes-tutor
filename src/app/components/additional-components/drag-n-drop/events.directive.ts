import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[stop]',
  standalone: true
})
export class EventsDirective {
@HostListener('mousedown', ['$event'])
OnMouseDown(e: MouseEvent) {
  e.stopPropagation()
}
  constructor() { }

}
