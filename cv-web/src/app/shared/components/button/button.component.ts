import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (href()) {
      <a 
        [href]="href()" 
        [target]="target()" 
        [rel]="target() === '_blank' ? 'noopener noreferrer' : null"
        [download]="download() ? '' : null"
        [class]="buttonClasses()"
        [attr.aria-label]="ariaLabel()"
        (click)="handleClick($event)">
        <ng-content select="[icon-left]"></ng-content>
        <ng-content></ng-content>
        <ng-content select="[icon-right]"></ng-content>
      </a>
    } @else {
      <button 
        type="button" 
        [class]="buttonClasses()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        (click)="handleClick($event)">
        <ng-content select="[icon-left]"></ng-content>
        <ng-content></ng-content>
        <ng-content select="[icon-right]"></ng-content>
      </button>
    }
  `
})
export class ButtonComponent {
  public readonly variant = input<ButtonVariant>('secondary');
  public readonly size = input<ButtonSize>('md');
  public readonly href = input<string | null>(null);
  public readonly target = input<string>('_self');
  public readonly download = input<boolean>(false);
  public readonly disabled = input<boolean>(false);
  public readonly ariaLabel = input<string | null>(null);

  public readonly clicked = output<MouseEvent>();

  public readonly buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    let sizeClass = '';
    switch (this.size()) {
      case 'sm':
        sizeClass = 'text-xs px-2.5 py-1.5 h-8';
        break;
      case 'lg':
        sizeClass = 'text-base px-5 py-2.5 h-11';
        break;
      case 'md':
      default:
        sizeClass = 'text-sm px-3.5 py-2 h-9';
        break;
    }

    let variantClass = '';
    switch (this.variant()) {
      case 'primary':
        variantClass = 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-xs';
        break;
      case 'outline':
        variantClass = 'border border-zinc-300 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60';
        break;
      case 'ghost':
        variantClass = 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50';
        break;
      case 'icon':
        sizeClass = this.size() === 'sm' ? 'w-8 h-8 p-0' : 'w-9 h-9 p-0';
        variantClass = 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50';
        break;
      case 'secondary':
      default:
        variantClass = 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 border border-zinc-200/60 dark:border-zinc-700/40';
        break;
    }

    return `${base} ${sizeClass} ${variantClass}`;
  });

  public handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
