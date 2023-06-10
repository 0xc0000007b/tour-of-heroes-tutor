import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page/header/header.component';
import { slider } from './routing-animations/routing-animations';
import { MessagesComponent } from './components/messages/messages/messages.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent {
  title = 'TourOfHeroes';

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
