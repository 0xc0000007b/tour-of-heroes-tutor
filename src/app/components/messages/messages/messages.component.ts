import { Component, inject, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TooltipDirective } from '../../additional-components/tooltip.directive';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { WindowService } from '../../message-window/window/services/window.service';
import { WindowComponent } from '../../message-window/window/window.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, TooltipDirective, MarkdownModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MarkdownService, WindowService],
})
export class MessagesComponent {
  private messagesService = inject(MessagesService);
  public messages$: Observable<string[]> = this.messagesService
    .getMessages()
    .pipe(takeUntilDestroyed());
  private windowService = inject(WindowService);
  open(template: TemplateRef<any>) {
    this.windowService.open(WindowComponent, {
      width: 200,
      height: 200,
      isAnimated: true,
      content: template,
    });
  }
  close(): void {
    this.windowService.close();
  }
}
