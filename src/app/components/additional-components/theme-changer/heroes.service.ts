import { inject, Injectable } from '@angular/core';
import { HeroInterface } from '../../heroes/interfaces/hero.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RequestHeroInterface } from '../../heroes/interfaces/request-hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private httpClient = inject(HttpClient);
  private httpRoute: string = 'http://localhost:3000/heroes';

  getAllHeroes(): Observable<HeroInterface[]> {
    return this.httpClient
      .get<HeroInterface[]>(this.httpRoute)
      .pipe(map((res: HeroInterface[]) => res as HeroInterface[]));
  }
  getHeroById(id: number): Observable<HeroInterface> {
    return this.httpClient
      .get<HeroInterface>(`${this.httpRoute}/${id}`)
      .pipe(map((res: HeroInterface) => res as HeroInterface));
  }
  saveHero(id: number, heroData: RequestHeroInterface) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient
      .put<RequestHeroInterface>(
        `http://localhost:3000/heroes/${id}`,
        heroData,
        headers
      )
      .subscribe((data) => console.log());
  }
  createHero(hero: RequestHeroInterface) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient
      .post<HeroInterface>(this.httpRoute, hero, headers)
      .subscribe((res) => console.log());
  }
  deleteHeo(id: number) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient
      .delete<HeroInterface>(`${this.httpRoute}/${id}`, headers)
      .subscribe((res) => console.log());
  }
}
