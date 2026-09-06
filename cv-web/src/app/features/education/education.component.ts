import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Education } from '../../core/models/cv-profile.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-education',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FontAwesomeModule, SectionCardComponent, TechBadgeComponent],
  template: `
    <div class="space-y-4 page-break-inside-avoid">
      <div class="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <fa-icon [icon]="['fas', 'graduation-cap']"></fa-icon>
        <span>Formación Académica</span>
      </div>

      <div class="space-y-4">
        @for (edu of education(); track edu.degree) {
          <app-section-card padding="lg" [interactive]="true">
            <div class="flex flex-col gap-6">
              
              <!-- Top Row: University Logo, Degree Header, and Status Badges -->
              <div class="flex items-start gap-4 sm:gap-5">
                <app-tech-badge 
                  name="Universidad de Guayaquil" 
                  image="images/ug.png" 
                  width="w-12 sm:w-16" 
                  height="h-12 sm:h-16" 
                  [interactive]="false">
                </app-tech-badge>

                <div class="flex-1 min-w-0">
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/60">
                    <div>
                      <div class="flex flex-wrap items-center gap-2.5">
                        <h3 class="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {{ edu.degree }}
                        </h3>
                        <span class="text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs">
                          {{ edu.status }}
                        </span>
                      </div>
                      <p class="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                        {{ edu.institution }}
                      </p>
                    </div>

                    <span class="text-xs sm:text-sm font-mono px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60 w-fit shrink-0">
                      {{ edu.period }}
                    </span>
                  </div>

                  @if (edu.summary) {
                    <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                      {{ edu.summary }}
                    </p>
                  }

                  @if (edu.highlights && edu.highlights.length > 0) {
                    <ul class="space-y-2.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                      @for (item of edu.highlights; track item) {
                        <li class="flex items-start gap-2.5">
                          <span class="text-zinc-400 dark:text-zinc-500 mt-1 select-none font-bold text-xs">▹</span>
                          <span class="leading-relaxed">{{ item }}</span>
                        </li>
                      }
                    </ul>
                  }
                </div>
              </div>

            </div>
          </app-section-card>
        }
      </div>
    </div>
  `
})
export class EducationComponent {
  public readonly education = input.required<readonly Education[]>();
}
