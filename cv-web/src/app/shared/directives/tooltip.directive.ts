import { 
  Directive, 
  ElementRef, 
  HostListener, 
  inject, 
  input, 
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  public readonly text = input.required<string>({ alias: 'appTooltip' });
  public readonly position = input<'top' | 'bottom'>('bottom');

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  @HostListener('focusin')
  public show(): void {
    if (!this.text() || this.tooltipEl) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'app-floating-tooltip');
    
    // Style the tooltip element with Tailwind-equivalent inline styles or utility classes
    const classes = [
      'fixed',
      'z-50',
      'px-2.5',
      'py-1',
      'text-[11px]',
      'font-mono',
      'font-medium',
      'rounded-md',
      'shadow-lg',
      'pointer-events-none',
      'transition-opacity',
      'duration-150',
      'bg-zinc-900',
      'text-zinc-100',
      'dark:bg-zinc-100',
      'dark:text-zinc-900',
      'border',
      'border-zinc-700/80',
      'dark:border-zinc-300/80',
      'animate-fadeIn'
    ];
    classes.forEach(c => this.renderer.addClass(this.tooltipEl, c));

    const textNode = this.renderer.createText(this.text());
    this.renderer.appendChild(this.tooltipEl, textNode);
    this.renderer.appendChild(document.body, this.tooltipEl);

    this.positionTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  public hide(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    const topPos = this.position() === 'top'
      ? hostRect.top - tooltipRect.height - 8
      : hostRect.bottom + 8;

    const leftPos = hostRect.left + (hostRect.width / 2) - (tooltipRect.width / 2);

    this.renderer.setStyle(this.tooltipEl, 'top', `${Math.max(6, topPos)}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${Math.max(6, leftPos)}px`);
  }
}
