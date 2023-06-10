import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from './interfaces/option.interafce';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangerService {
  private httpClient = inject(HttpClient);
  private styleManager = inject(StyleManagerService);
  getThemeOptions(): Observable<Option[]> {
    return this.httpClient.get<Option[]>('./themes/options.json');
  }

  setTheme(themeToSet: string): void {
    this.styleManager.setStyle(
      'theme',
      `../../assets/themes/${themeToSet}.css`
    );
  }
}
