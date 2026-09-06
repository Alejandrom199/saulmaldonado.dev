import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageItem } from '../../core/models/cv-profile.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-languages',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FontAwesomeModule, SectionCardComponent],
  template: `
    <div class="space-y-4 page-break-inside-avoid">
      <div class="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <fa-icon [icon]="['fas', 'language']"></fa-icon>
        <span>Idiomas</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        @for (lang of languages(); track lang.language) {
          <app-section-card padding="md" [interactive]="true">
            <div class="flex items-center justify-between gap-3">
              <div class="space-y-1">
                <h4 class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {{ lang.language }}
                </h4>
                @if (lang.note) {
                  <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    {{ lang.note }}
                  </p>
                }
              </div>

              <span class="text-xs sm:text-sm font-mono font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700/60 shrink-0 shadow-2xs">
                {{ lang.level }}
              </span>
            </div>
          </app-section-card>
        }
      </div>
    </div>
  `
})
export class LanguagesComponent {
  public readonly languages = input.required<readonly LanguageItem[]>();
}
