import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, SectionCardComponent, TechBadgeComponent],
  template: `
    <section class="py-2 page-break-inside-avoid">
      <app-section-card padding="lg">
        <p class="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {{ summary() }}
        </p>

        <!-- Key Pillars Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800/80">
          <div class="space-y-2">
            <span class="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              Enfoque Principal
            </span>
            <p class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Desarrollo Full Stack & APIs RESTful
            </p>
            <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Arquitecturas modernas, escalables y desacopladas.
            </p>
          </div>

          <div class="space-y-2">
            <span class="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              Dominio de Negocio
            </span>
            <p class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Sector Financiero & Bancario
            </p>
            <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Reglas de negocio críticas, transacciones y alta disponibilidad.
            </p>
          </div>

          <div class="space-y-2">
            <span class="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              Especialidad Tecnológica
            </span>
            <div class="flex items-center gap-2 pt-1">
              <app-tech-badge name=".NET" tooltip=".NET Core / C#" width="w-9 sm:w-10" height="h-9 sm:h-10"></app-tech-badge>
              <app-tech-badge name="Angular" tooltip="Angular" width="w-9 sm:w-10" height="h-9 sm:h-10"></app-tech-badge>
              <app-tech-badge name="SQL Server" tooltip="SQL Server" width="w-9 sm:w-10" height="h-9 sm:h-10"></app-tech-badge>
            </div>
          </div>
        </div>
      </app-section-card>
    </section>
  `
})
export class SummaryComponent {
  public readonly summary = input.required<string>();
}
