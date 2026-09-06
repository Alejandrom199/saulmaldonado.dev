import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.currentToast(); as toast) {
      <div 
        class="toast-container fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl shadow-lg border border-zinc-800 dark:border-zinc-200 transition-all duration-200"
        [class.opacity-100]="toastService.isVisible()"
        [class.translate-y-0]="toastService.isVisible()"
        [class.opacity-0]="!toastService.isVisible()"
        [class.translate-y-2]="!toastService.isVisible()"
        role="status" 
        aria-live="polite">
        
        <!-- Checkmark icon -->
        <div class="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <span class="text-xs sm:text-sm font-medium">
          {{ toast.message }}
        </span>

        <button 
          type="button" 
          (click)="toastService.dismiss()"
          class="ml-2 text-zinc-400 hover:text-zinc-200 dark:hover:text-zinc-700 transition-colors cursor-pointer"
          aria-label="Cerrar notificación">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    }
  `
})
export class ToastComponent {
  public readonly toastService = inject(ToastService);
}
