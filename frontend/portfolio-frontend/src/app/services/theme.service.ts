import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly localStorageKey = 'portfolio-theme';
  private readonly themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  
  theme$ = this.themeSubject.asObservable();

  constructor() {
    // Listen for changes in system color scheme preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQuery => {
        if (this.getStoredTheme() === null) { // Only apply system preference if no theme is stored
          this.setTheme(mediaQuery.matches ? 'dark' : 'light');
        }
      });
    }
  }

  private getInitialTheme(): string {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    // Use system preference if no theme is stored
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light'; // Default to light theme
  }

  private getStoredTheme(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  private setStoredTheme(theme: string): void {
    localStorage.setItem(this.localStorageKey, theme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeSubject.next(theme);
    this.setStoredTheme(theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: string): void {
    // Apply theme class to the body
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  // Public method to get the current theme value
  getCurrentTheme(): string {
    return this.themeSubject.value;
  }
} 