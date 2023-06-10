import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { PersistanceService } from '../theme-changer/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  private http = inject(HttpClient);
  private cache = new Map<string, string>();
  private icons = new BehaviorSubject<string[]>([]);
  private persictanceService = inject(PersistanceService);
  constructor() {
    this.loadFromStorage();
  }

  public getIcons(): Observable<string[]> {
    return this.icons.asObservable();
  }

  public getIcon(name: string): Observable<string | undefined> {
    if (this.cache.has(name)) {
      return of(this.cache.get(name));
    }

    const url = `assets/icons/${name}.svg`;
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((svg) => this.cacheSvg(name, svg)));
  }

  private cacheSvg(name: string, svg: string): string {
    this.cache.set(name, svg);
    this.persictanceService.saveItem(
      'icon',
      JSON.stringify(Array.from(this.cache.entries()))
    );
    this.icons.next(Array.from(this.cache.keys()));
    return svg;
  }

  private loadFromStorage() {
    try {
      const cache = JSON.parse(localStorage.getItem('icon') as string) || [];
      for (const [name, svg] of cache) {
        this.cache.set(name, svg);
      }
      this.icons.next(Array.from(this.cache.keys()));
    } catch (error) {
      console.warn('Could not load SVG icons cache from local storage', error);
    }
  }
}
