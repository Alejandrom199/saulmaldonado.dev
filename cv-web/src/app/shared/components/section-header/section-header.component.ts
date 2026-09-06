import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div class="flex items-center gap-2.5">
        @if (index()) {
          <span class="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 select-none">
            {{ index() }}
          </span>
          <span class="text-zinc-300 dark:text-zinc-700">/</span>
        }
        <h2 class="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {{ title() }}
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <ng-content select="[actions]"></ng-content>
      </div>
    </header>
  `
})
export class SectionHeaderComponent {
  public readonly title = input.required<string>();
  public readonly index = input<string | null>(null);
}
