import { Component, input, computed, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TechLogoComponent } from '../tech-logo/tech-logo.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TechLogoComponent, TooltipDirective],
  template: `
    <div 
      [appTooltip]="tooltipText()"
      class="inline-flex items-center justify-center shrink-0 overflow-hidden shadow-2xs transition-all select-none"
      [class.cursor-pointer]="interactive()"
      [class.hover:scale-110]="interactive()"
      [class]="containerClasses()"
      [style.width]="inlineWidth()"
      [style.height]="inlineHeight()">
      
      @if (resolvedImage()) {
        <img 
          [src]="resolvedImage()!" 
          [alt]="name() || 'Tecnología'" 
          class="w-full h-full"
          [class.object-cover]="shouldFill()"
          [class.object-contain]="!shouldFill()"
          [class.p-1]="!shouldFill() && !image()" />
      } @else if (icon()) {
        <div class="w-full h-full p-1 flex items-center justify-center">
          <div class="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-100 rounded-xl">
            <fa-icon [icon]="icon()!" [class]="iconClass()"></fa-icon>
          </div>
        </div>
      } @else {
        <span class="w-full h-full p-1 flex items-center justify-center">
          <app-tech-logo [name]="name()" size="full"></app-tech-logo>
        </span>
      }
    </div>
  `
})
export class TechBadgeComponent {
  public readonly name = input<string>('');
  public readonly width = input<string>('w-10');
  public readonly height = input<string>('h-10');
  public readonly image = input<string | null>(null);
  public readonly fill = input<boolean, unknown>(false, { transform: booleanAttribute }); // Opción de fill (100% de cobertura)
  public readonly icon = input<IconProp | null>(null);
  public readonly iconClass = input<string>('text-2xl sm:text-3xl text-zinc-500');
  public readonly border = input<string>('border-none border-0'); // Por defecto border none
  public readonly rounded = input<string>('rounded-xl');
  public readonly bg = input<string>('bg-white dark:bg-white');
  public readonly tooltip = input<string | null>(null);
  public readonly interactive = input<boolean>(true);

  public readonly isDotnet = computed(() => {
    const n = this.name().toLowerCase().trim();
    const img = (this.image() || '').toLowerCase();
    return n.includes('.net') || n.includes('dotnet') || n.includes('asp.net') || img.includes('dotnet');
  });

  public readonly isMongo = computed(() => {
    const n = this.name().toLowerCase().trim();
    const img = (this.image() || '').toLowerCase();
    return n.includes('mongo') || img.includes('mongo');
  });

  public readonly isTypescript = computed(() => {
    const n = this.name().toLowerCase().trim();
    const img = (this.image() || '').toLowerCase();
    return n.includes('typescript') || n === 'ts' || img.includes('typescript');
  });

  public readonly isJavascript = computed(() => {
    const n = this.name().toLowerCase().trim();
    const img = (this.image() || '').toLowerCase();
    return (n.includes('javascript') || n === 'js' || img.includes('js.')) && !n.includes('typescript');
  });

  public readonly isViamatica = computed(() => {
    const n = this.name().toLowerCase().trim();
    const img = (this.image() || '').toLowerCase();
    return n.includes('viamatica') || img.includes('viamatica');
  });

  public readonly shouldFill = computed(() => {
    return this.fill() || this.isDotnet() || this.isMongo() || this.isTypescript() || this.isJavascript() || this.isViamatica();
  });

  public readonly tooltipText = computed(() => {
    if (this.tooltip()) return this.tooltip()!;
    if (this.name()) return this.name();
    return '';
  });

  public readonly resolvedImage = computed<string | null>(() => {
    if (this.image()) return this.image();
    const n = this.name().toLowerCase().trim();
    if (!n) return null;

    // Frameworks & Core Tech
    if (n.includes('.net') || n.includes('dotnet') || n.includes('asp.net')) return 'images/tech/dotnet.webp';
    if (n.includes('c#') || n === 'csharp') return 'images/tech/csharp.png';
    if (n.includes('angular')) return 'images/tech/angular.png';
    if (n.includes('react')) return 'images/tech/react.webp';
    if (n.includes('typescript') || n === 'ts') return 'images/tech/typescript.svg';
    if (n.includes('javascript') || n === 'js' || n.includes('es6')) return 'images/tech/js.png';
    if (n.includes('tailwind')) return 'images/tech/tailwind.webp';
    if (n.includes('html')) return 'images/tech/html5.webp';
    if (n.includes('css')) return 'images/tech/css3.webp';
    if (n.includes('figma')) return 'images/tech/figma.svg';
    if (n.includes('spring')) return 'images/tech/springboot.png';
    if (n.includes('node')) return 'images/tech/nodejs.webp';
    if (n.includes('python')) return 'images/tech/python.webp';
    if (n.includes('java') && !n.includes('script')) return 'images/tech/java.png';
    if (n.includes('php')) return 'images/tech/php.webp';

    // Databases & Cache
    if (n.includes('sql server') || n.includes('sqlserver') || n.includes('t-sql') || n === 'sql') return 'images/tech/sqlserver.png';
    if (n.includes('postgres')) return 'images/tech/postgresql.svg';
    if (n.includes('mysql')) return 'images/tech/mysql.png';
    if (n.includes('oracle')) return 'images/tech/oracle.png';
    if (n.includes('mongo')) return 'images/tech/mongodb.png';
    if (n.includes('redis')) return 'images/tech/redis.png';

    // Cloud, DevOps & Tools
    if (n.includes('aws') || n.includes('amazon')) return 'images/tech/aws.png';
    if (n.includes('docker')) return 'images/tech/docker.png';
    if (n.includes('kubernetes') || n.includes('k8s')) return 'images/tech/kubernetes.png';
    if (n.includes('jenkins')) return 'images/tech/jenkins.png';
    if (n.includes('terraform')) return 'images/tech/terraform.png';
    if (n.includes('ansible')) return 'images/tech/ansible.webp';
    if (n.includes('linux') || n.includes('debian') || n.includes('ubuntu')) return 'images/tech/linux.webp';
    if (n.includes('git') && !n.includes('digital')) return 'images/tech/git.png';
    if (n.includes('postman')) return 'images/tech/postman.webp';
    if (n.includes('swagger')) return 'images/tech/swagger.png';
    if (n.includes('vscode') || n.includes('vs code')) return 'images/tech/vscode.png';
    if (n.includes('visual studio') || n === 'vs') return 'images/tech/visual-studio.webp';

    // Companies & Institutions
    if (n.includes('viamatica')) return 'images/viamatica.jpg';
    if (n.includes('siglo')) return 'images/siglo21.jpg';
    if (n.includes('ug') || n.includes('universidad') || n.includes('guayaquil')) return 'images/ug.png';
    return null;
  });

  public readonly containerClasses = computed(() => {
    const classes = [this.bg(), this.rounded(), this.border()];
    if (this.width().includes('w-')) classes.push(this.width());
    if (this.height().includes('h-')) classes.push(this.height());
    return classes.join(' ');
  });

  public readonly inlineWidth = computed(() => {
    return this.width().includes('w-') ? null : this.width();
  });

  public readonly inlineHeight = computed(() => {
    return this.height().includes('h-') ? null : this.height();
  });
}
