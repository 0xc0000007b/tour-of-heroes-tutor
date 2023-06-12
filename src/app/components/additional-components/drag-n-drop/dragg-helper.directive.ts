import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from "@angular/cdk/portal";
import { DragDropDirective} from "./drag-drop.directive";
import {GlobalPositionStrategy, Overlay, OverlayRef} from "@angular/cdk/overlay";

@Directive({
  selector: '[appDraggHelper]',
  standalone: true
})
export class DraggHelperDirective implements OnInit, OnDestroy{
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: { x: number; y: number };

  constructor(private draggable: DragDropDirective,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private overlay: Overlay) { }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe(event => this.onDragStart(event))
    this.draggable.dragMove.subscribe(event => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());

    // create an overlay...
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    // remove the overlay...
    this.overlayRef.dispose();
  }

  private onDragStart(event: MouseEvent): void {
    // determine relative start position
    const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();

    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    };

    // added after YouTube video: width
    this.overlayRef.overlayElement.style.width = `${clientRect.width}px`;
  }

  private onDragMove(event: MouseEvent): void {
    if (!this.overlayRef.hasAttached()) {
      // render the helper in the overlay
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
      // added after YouTube video: width
      const rootElement = this.overlayRef.overlayElement.firstChild as HTMLElement;
      rootElement.style.width = '100%';
      rootElement.style.boxSizing = 'border-box';
    }

    // position the helper...
    this.positionStrategy.left(`${event.clientX - this.startPosition!.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition!.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    // remove the helper from the overlay
    this.overlayRef.detach();
  }

}
