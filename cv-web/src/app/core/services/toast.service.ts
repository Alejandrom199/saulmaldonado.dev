import { Injectable, signal } from '@angular/core';

export interface ToastData {
  readonly message: string;
  readonly type?: 'success' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public readonly currentToast = signal<ToastData | null>(null);
  public readonly isVisible = signal<boolean>(false);
  private timeoutId: any = null;

  public show(message: string, type: 'success' | 'info' = 'success', durationMs = 2800): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.currentToast.set({ message, type });
    this.isVisible.set(true);

    this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, durationMs);
  }

  public dismiss(): void {
    this.isVisible.set(false);
    setTimeout(() => {
      this.currentToast.set(null);
    }, 200);
  }
}
