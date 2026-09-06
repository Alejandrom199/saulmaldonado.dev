import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article 
      class="rounded-xl border transition-all duration-200"
      [class.p-5]="padding() === 'md'"
      [class.p-6]="padding() === 'lg'"
      [class.p-4]="padding() === 'sm'"
      [class.hover-border]="interactive()"
      [class]="cardVariantClasses()">
      <ng-content></ng-content>
    </article>
  `,
  styles: [`
    .hover-border:hover {
      border-color: rgba(161, 161, 170, 0.5);
    }
  `]
})
export class SectionCardComponent {
  public readonly padding = input<'sm' | 'md' | 'lg'>('md');
  public readonly interactive = input<boolean>(false);
  public readonly variant = input<'default' | 'subtle' | 'outline'>('default');

  public get cardVariantClasses(): () => string {
    return () => {
      switch (this.variant()) {
        case 'subtle':
          return 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60';
        case 'outline':
          return 'bg-transparent border-zinc-200 dark:border-zinc-800';
        case 'default':
        default:
          return 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]';
      }
    };
  }
}
