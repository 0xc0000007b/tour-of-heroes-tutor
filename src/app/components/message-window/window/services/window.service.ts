import {
  ComponentRef,
  inject,
  Injectable,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private viewContainerRef = inject(ViewContainerRef);
  open(
    component: any,
    options: {
      width: number;
      height: number;
      content: TemplateRef<any>;
      isAnimated: boolean;
    }
  ): void {
    const componentRef: ComponentRef<any> =
      this.viewContainerRef.createComponent(component);
    componentRef.instance.widthInPx = options.width;
    componentRef.instance.heightInPx = options.height;
    componentRef.instance.content = options.content;
    componentRef.instance.isAnimated = options.isAnimated;
  }
}
