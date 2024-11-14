import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

 private theme = 'light'; // Tema por defecto

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }

  getTheme(): string {
    return this.theme;
  }
}
