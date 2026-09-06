import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Certification } from '../../core/models/cv-profile.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-certifications',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FontAwesomeModule, SectionCardComponent, TechBadgeComponent],
  template: `
    <div class="space-y-4 page-break-inside-avoid">
      <div class="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <fa-icon [icon]="['fas', 'certificate']"></fa-icon>
        <span>Certificaciones & Credenciales</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (cert of certifications(); track cert.id) {
          <app-section-card padding="md" [interactive]="true">
            <div class="flex items-start gap-4">
              
              <!-- Entity / Tech Logo via TechBadgeComponent -->
              @if (cert.credentialType === 'security') {
                <app-tech-badge [icon]="['fas', 'shield-halved']" iconClass="text-rose-500 text-xl" width="w-12" height="h-12" rounded="rounded-2xl" [interactive]="false"></app-tech-badge>
              } @else {
                <app-tech-badge [name]="cert.title + ' ' + cert.issuer" [icon]="['fas', 'certificate']" iconClass="text-amber-500 text-xl" width="w-12" height="h-12" rounded="rounded-2xl" [interactive]="false"></app-tech-badge>
              }

              <!-- Details -->
              <div class="space-y-1.5 flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs sm:text-sm font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                    {{ cert.issuer }}
                  </span>
                  <span class="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                    {{ cert.issueDate }}
                  </span>
                </div>

                <h3 class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {{ cert.title }}
                </h3>

                @if (cert.badgeText) {
                  <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono pt-0.5">
                    {{ cert.badgeText }}
                  </p>
                }
              </div>

            </div>
          </app-section-card>
        }
      </div>
    </div>
  `
})
export class CertificationsComponent {
  public readonly certifications = input.required<readonly Certification[]>();
}
