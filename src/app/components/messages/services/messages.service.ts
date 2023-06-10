import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    '',
  ]);
  postMessage(message: string): void {
    this.messages.value.push(message);
  }
  getMessages(): Observable<string[]> {
    return this.messages.asObservable();
  }
}
