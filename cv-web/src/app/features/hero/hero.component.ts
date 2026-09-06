import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CvProfile } from '../../core/models/cv-profile.model';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FontAwesomeModule, TechBadgeComponent, TooltipDirective],
  template: `
    <header class="relative pt-4 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <!-- Left: Photo & Core Profile Information -->
        <div class="flex items-center gap-5 sm:gap-6">
          
          <!-- Avatar Frame -->
          <div class="relative shrink-0">
            <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-zinc-200/80 dark:border-zinc-800 shadow-md bg-zinc-100 dark:bg-zinc-900">
              <img 
                [src]="profile().photoUrl" 
                [alt]="profile().fullName" 
                class="w-full h-full object-cover object-top"
                loading="eager" />
            </div>
          </div>

          <!-- Name, Title & Location -->
          <div class="space-y-2">
            <div>
              <div class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono mb-1">
                <span>{{ profile().contact.location }}</span>
              </div>

              <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {{ profile().fullName }}
              </h1>
              <p class="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                {{ profile().title }}
              </p>
            </div>

            <!-- Core Technologies: Icons Only with Tooltips (via TechBadgeComponent with border-0) -->
            <div class="flex items-center gap-2 pt-1.5">
              <app-tech-badge name=".NET" tooltip=".NET Core" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
              <app-tech-badge name="C#" tooltip="C#" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
              <app-tech-badge name="Angular" tooltip="Angular" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
              <app-tech-badge name="SQL Server" tooltip="SQL Server" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
              <app-tech-badge name="Docker" tooltip="Docker" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
              <app-tech-badge name="AWS" tooltip="AWS (Cloud)" width="w-8.5 sm:w-9.5" height="h-8.5 sm:h-9.5"></app-tech-badge>
            </div>
          </div>
        </div>

        <!-- Right: Action Icons Only with Tooltips -->
        <div class="action-buttons flex items-center gap-2 sm:self-center">
          
          <!-- Copy Email Icon Button -->
          <button 
            type="button" 
            appTooltip="Copiar correo: alejandrom199916@gmail.com"
            (click)="copyEmail()"
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs cursor-pointer"
            aria-label="Copiar correo electrónico">
            <fa-icon [icon]="['fas', 'envelope']" class="text-base text-zinc-600 dark:text-zinc-300"></fa-icon>
          </button>

          <!-- Copy Phone Icon Button -->
          <button 
            type="button" 
            appTooltip="Copiar teléfono: +593 98 880 6541"
            (click)="copyPhone()"
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs cursor-pointer"
            aria-label="Copiar teléfono">
            <fa-icon [icon]="['fas', 'phone']" class="text-base text-zinc-600 dark:text-zinc-300"></fa-icon>
          </button>

          <!-- Download PDF Icon Button -->
          <a 
            [href]="profile().contact.pdfUrl" 
            target="_blank" 
            download
            appTooltip="Descargar CV en PDF"
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs cursor-pointer"
            aria-label="Descargar CV en PDF">
            <fa-icon [icon]="['fas', 'file-pdf']" class="text-base text-red-600 dark:text-red-400"></fa-icon>
          </a>

          <!-- LinkedIn Icon Button -->
          <a 
            [href]="profile().contact.linkedinUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            appTooltip="Perfil de LinkedIn"
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs cursor-pointer"
            aria-label="Perfil de LinkedIn">
            <svg class="w-5 h-5 fill-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z"/>
            </svg>
          </a>

          <!-- GitHub Icon Button -->
          <a 
            [href]="profile().contact.githubUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            appTooltip="Perfil de GitHub"
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs cursor-pointer"
            aria-label="Perfil de GitHub">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
            </svg>
          </a>

        </div>

      </div>
    </header>
  `
})
export class HeroComponent {
  public readonly profile = input.required<CvProfile>();
  private readonly toastService = inject(ToastService);

  public copyEmail(): void {
    const email = this.profile().contact.email;
    navigator.clipboard.writeText(email).then(() => {
      this.toastService.show(`Email copiado: ${email}`);
    }).catch(() => {
      this.toastService.show('No se pudo copiar automáticamente', 'info');
    });
  }

  public copyPhone(): void {
    const phone = this.profile().contact.phoneFormatted;
    navigator.clipboard.writeText(phone).then(() => {
      this.toastService.show(`Teléfono copiado: ${phone}`);
    }).catch(() => {
      this.toastService.show('No se pudo copiar automáticamente', 'info');
    });
  }
}
