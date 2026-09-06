import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkExperience } from '../../core/models/cv-profile.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FontAwesomeModule, SectionCardComponent, TechBadgeComponent],
  template: `
    <section class="py-2">
      <div class="space-y-6">
        @for (exp of experiences(); track exp.id) {
          <div class="page-break-inside-avoid">
            
            <app-section-card padding="lg" [interactive]="true">
              <div class="flex items-start gap-4 sm:gap-5">
                
                <!-- Company Logo Card (Viamatica with fill, Siglo 21, or Fallback) -->
                <app-tech-badge 
                  [name]="exp.company" 
                  [icon]="['fas', 'briefcase']" 
                  iconClass="text-lg sm:text-xl text-zinc-500"
                  width="w-12 sm:w-14" 
                  height="h-12 sm:h-14" 
                  [fill]="exp.company.toLowerCase().includes('viamatica')"
                  [interactive]="false">
                </app-tech-badge>

                <!-- Right: Content Details -->
                <div class="flex-1 min-w-0">
                  <header class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                    <div class="space-y-1">
                      <div class="flex flex-wrap items-center gap-2.5">
                        <h3 class="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          {{ exp.role }}
                        </h3>
                        @if (exp.isCurrent) {
                          <span class="text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs">
                            Actual
                          </span>
                        }
                      </div>

                      <div class="flex flex-wrap items-center gap-x-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                        <span class="text-zinc-900 dark:text-zinc-200 font-semibold">
                          {{ exp.company }}
                        </span>
                        @if (exp.project) {
                          <span class="text-zinc-300 dark:text-zinc-700">/</span>
                          <span>Proyecto: <strong class="text-zinc-800 dark:text-zinc-200 font-medium">{{ exp.project }}</strong></span>
                        }
                      </div>
                    </div>

                    <div class="flex flex-col sm:items-end gap-1 text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                      <span class="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 flex items-center gap-1.5">
                        <fa-icon [icon]="['fas', 'clock']" class="text-xs"></fa-icon>
                        {{ exp.period }}
                      </span>
                      <span class="text-xs sm:text-sm">{{ exp.employmentType }}</span>
                    </div>
                  </header>

                  <!-- Responsibilities Checklist -->
                  <div class="mt-4">
                    <ul class="space-y-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
                      @for (resp of exp.responsibilities; track $index) {
                        <li class="flex items-start gap-2.5">
                          <span class="text-zinc-400 dark:text-zinc-500 mt-1 select-none font-bold text-xs">▹</span>
                          <span class="leading-relaxed">{{ resp }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Tech Stack: Powered by TechBadgeComponent with border-0 -->
                  @if (exp.technologies.length > 0) {
                    <div class="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap items-center gap-2">
                      <span class="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500 mr-1 select-none">Stack:</span>
                      @for (tech of exp.technologies; track tech) {
                        <app-tech-badge 
                          [name]="tech" 
                          width="w-7.5 sm:w-8.5" 
                          height="h-7.5 sm:h-8.5">
                        </app-tech-badge>
                      }
                    </div>
                  }

                </div>
              </div>
            </app-section-card>

          </div>
        }
      </div>
    </section>
  `
})
export class ExperienceComponent {
  public readonly experiences = input.required<readonly WorkExperience[]>();
}
