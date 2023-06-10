import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  public saveItem(key: string, item: any) {
    localStorage.setItem(key, item);
  }
  public getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    if (item !== null || undefined) {
      return item;
    }
    return null;
  }
}
