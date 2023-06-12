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
  private count = 0;
  private offset = 0;
  private maxColumns = 3;
  private maxRows = 3;

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
    componentRef.instance.windowId = ++this.count;
    componentRef.instance.widthInPx = options.width;
    componentRef.instance.heightInPx = options.height;
    componentRef.instance.content = options.content;
    componentRef.instance.isAnimated = options.isAnimated;
    componentRef.location.nativeElement.style.left = `${this.getColumn()}%`;
    componentRef.location.nativeElement.style.top = `${this.getRow()}%`;
    componentRef.location.nativeElement.style.transform = `translate(-50%, -50%)`;
  }

  close(): void {
    this.viewContainerRef.remove();
  }

  private getColumn(): number {
    if ((this.count - 1) % this.maxColumns === 0) {
      this.offset = 0;
    }
    this.offset += 25;
    return Math.min(this.offset, this.maxColumns * 25);
  }

  private getRow(): number {
    const row = Math.floor((this.count - 1) / this.maxColumns);
    return Math.min(row * 25, this.maxRows * 25);
  }
}
