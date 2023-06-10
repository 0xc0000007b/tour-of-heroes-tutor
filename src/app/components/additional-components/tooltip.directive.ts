import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Injector,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() tooltipText: string = '';
  @Input() template: TemplateRef<any>;
  private element: ElementRef = inject(ElementRef);

  private viewContainerRef = inject(ViewContainerRef);
  private tooltipComponent: ComponentRef<any>;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.tooltipComponent =
      this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipComponent.instance.text = this.tooltipText;
    const { left, right, bottom } =
      this.element.nativeElement.getBoundingClientRect();

    this.tooltipComponent.instance.leftInPx = (right - left) / 2 + left;
    this.tooltipComponent.instance.topInPx = bottom;

    this.tooltipComponent.instance.content = this.template;
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.viewContainerRef.clear();
  }
}
