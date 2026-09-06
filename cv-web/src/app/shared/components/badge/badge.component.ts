import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'outline' | 'status' | 'tech' | 'highlight';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses()">
      @if (variant() === 'status') {
        <span class="relative flex h-2 w-2 mr-1.5">
          @if (pulse()) {
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          }
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      }
      <ng-content></ng-content>
      {{ label() }}
    </span>
  `
})
export class BadgeComponent {
  public readonly label = input<string>('');
  public readonly variant = input<BadgeVariant>('default');
  public readonly size = input<BadgeSize>('md');
  public readonly pulse = input<boolean>(true);

  public readonly badgeClasses = computed(() => {
    const base = 'inline-flex items-center font-medium transition-colors select-none';
    
    const sizeClasses = this.size() === 'sm' 
      ? 'text-xs px-2 py-0.5 rounded-md' 
      : 'text-xs px-2.5 py-1 rounded-md';

    let variantClasses = '';
    switch (this.variant()) {
      case 'status':
        variantClasses = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20';
        break;
      case 'tech':
        variantClasses = 'font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-500';
        break;
      case 'highlight':
        variantClasses = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs';
        break;
      case 'outline':
        variantClasses = 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400';
        break;
      case 'default':
      default:
        variantClasses = 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-transparent';
        break;
    }

    return `${base} ${sizeClasses} ${variantClasses}`;
  });
}
