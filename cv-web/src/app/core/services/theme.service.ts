import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMode } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // State signals
  public readonly themeMode = signal<ThemeMode>('system');
  public readonly isDark = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.initializeTheme();
      this.setupPrintHandlers();
    }
  }

  private initializeTheme(): void {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    const initialMode: ThemeMode = (saved === 'light' || saved === 'dark') ? saved : 'system';
    this.themeMode.set(initialMode);
    this.applyTheme(initialMode);

    // Watch system media query changes safely
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', (e) => {
          if (this.themeMode() === 'system') {
            this.updateDom(e.matches);
          }
        });
      }
    }
  }

  private setupPrintHandlers(): void {
    if (typeof window === 'undefined') return;

    // Temporarily switch to clean light mode when printing to avoid dark mode print discoloration
    window.addEventListener('beforeprint', () => {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.classList.remove('dark');
      }
    });

    window.addEventListener('afterprint', () => {
      if (this.isDark() && typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.classList.add('dark');
      }
    });
  }

  public setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
    if (this.isBrowser) {
      if (mode === 'system') {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', mode);
      }
      this.applyTheme(mode);
    }
  }

  public toggleTheme(): void {
    const nextMode: ThemeMode = this.isDark() ? 'light' : 'dark';
    this.setTheme(nextMode);
  }

  private applyTheme(mode: ThemeMode): void {
    if (!this.isBrowser) return;

    if (mode === 'system') {
      const systemDark = (typeof window !== 'undefined' && typeof window.matchMedia === 'function')
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
      this.updateDom(systemDark);
    } else {
      this.updateDom(mode === 'dark');
    }
  }

  private updateDom(isDark: boolean): void {
    this.isDark.set(isDark);
    if (typeof document !== 'undefined' && document.documentElement) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
