import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tech-logo',
  standalone: true,
  host: { 
    class: 'inline-flex items-center justify-center',
    '[class.w-full]': "size() === 'full'",
    '[class.h-full]': "size() === 'full'"
  },
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <span class="inline-flex items-center justify-center shrink-0 overflow-hidden" [class]="sizeClasses()" [class.p-1]="size() === 'full' && !isCoverImage()">
      @if (imageSrc()) {
        <img [src]="imageSrc()!" [alt]="name()" class="w-full h-full" [class.object-cover]="isCoverImage()" [class.object-contain]="!isCoverImage()" />
      } @else if (faIcon()) {
        <fa-icon [icon]="faIcon()!" [class]="faClasses()" [class.text-xl]="size() === 'full' || size() === 'lg'" [class.text-base]="size() === 'md'"></fa-icon>
      } @else if (customSvg() === 'dotnet') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-indigo-600 dark:text-indigo-400">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <path d="M7 14V10l3 4V10M13.5 10v4h2.5M13.5 12h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      } @else if (customSvg() === 'csharp') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-purple-600 dark:text-purple-400">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c1.8 0 3.2 1 3.9 2.5l-1.8 1a2.3 2.3 0 0 0-2.1-1.3 2.3 2.3 0 0 0-2.3 2.3 2.3 2.3 0 0 0 2.3 2.3c.9 0 1.7-.5 2.1-1.3l1.8 1c-.7 1.5-2.1 2.5-3.9 2.5zm4.8-5h-1.2v-1.2h1.2v-1.2h1.2v1.2h1.2v1.2h-1.2v1.2h1.2v1.2h-1.2v1.2h-1.2v-1.2h-1.2v-1.2h1.2z"/>
        </svg>
      } @else if (customSvg() === 'sqlserver' || customSvg() === 'database') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-red-600 dark:text-red-400">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      } @else if (customSvg() === 'typescript') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-blue-600 dark:text-blue-400">
          <rect width="20" height="20" x="2" y="2" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M6 10h5m-2.5 0v7M14 15.5c.8.6 1.8.8 2.6.4.8-.4 1-1.3.6-2.1-.3-.6-1-1-1.7-1.4-.7-.4-1.4-.9-1.6-1.6-.3-1 .2-2.1 1.2-2.5 1-.4 2.2-.2 3 .4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        </svg>
      } @else if (customSvg() === 'postgresql') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-full h-full text-sky-600 dark:text-sky-400">
          <ellipse cx="12" cy="12" rx="8" ry="7"/>
          <path d="M8 12c1-2 3-3 4-3s3 1 4 3m-5 4h2"/>
        </svg>
      } @else if (customSvg() === 'kubernetes') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-full h-full text-blue-500">
          <polygon points="12 2 20 7 20 17 12 22 4 17 4 7 12 2"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      } @else if (customSvg() === 'terraform') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-violet-600 dark:text-violet-400">
          <polygon points="2 3 9 7 9 15 2 11"/>
          <polygon points="10 7 17 3 17 11 10 15"/>
          <polygon points="10 16 17 12 17 20 10 24"/>
        </svg>
      } @else if (customSvg() === 'azure') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-sky-600 dark:text-sky-400">
          <path d="M13.05 4.24l-5.7 10.15 4.3 3.65 6.45-11.83-5.05-1.97zm-6.62 10.65l-4.43 3.69 7.42 1.42 2.65-4.43-5.64-.68z"/>
        </svg>
      } @else if (customSvg() === 'mongodb') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-emerald-600 dark:text-emerald-500">
          <path d="M12 2C11.5 3 7 8 7 13.5C7 18 10 21 12 22C14 21 17 18 17 13.5C17 8 12.5 3 12 2ZM12 4.5C13 6.5 15.5 10 15.5 13.5C15.5 16.5 13.5 19 12 20.2V4.5Z"/>
        </svg>
      } @else if (customSvg() === 'redis') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-rose-600 dark:text-rose-500">
          <path d="M21 16.5L12 21.5L3 16.5V7.5L12 2.5L21 7.5V16.5ZM12 4.8L5.5 8.4L12 12.1L18.5 8.4L12 4.8ZM12 14.1L6 10.7V15.3L12 18.7L18 15.3V10.7L12 14.1Z"/>
        </svg>
      } @else if (customSvg() === 'tailwind') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-teal-500">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-zinc-400">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="m9 9 6 6m0-6-6 6"/>
        </svg>
      }
    </span>
  `
})
export class TechLogoComponent {
  public readonly name = input.required<string>();
  public readonly size = input<'sm' | 'md' | 'lg' | 'full'>('sm');

  public readonly sizeClasses = computed(() => {
    switch (this.size()) {
      case 'full': return 'w-full h-full';
      case 'lg': return 'w-8 h-8';
      case 'md': return 'w-6 h-6';
      case 'sm':
      default: return 'w-4 h-4';
    }
  });

  public readonly isCoverImage = computed(() => {
    const n = this.name().toLowerCase().trim();
    return n.includes('.net') || n.includes('dotnet') || n.includes('asp.net') || n.includes('mongo') || n.includes('typescript') || n === 'ts' || n.includes('javascript') || n === 'js' || n.includes('viamatica');
  });

  public readonly imageSrc = computed<string | null>(() => {
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

  public readonly faIcon = computed<IconProp | null>(() => {
    if (this.imageSrc()) return null;
    const n = this.name().toLowerCase().trim();
    if (n.includes('angular')) return ['fab', 'angular'];
    if (n.includes('react')) return ['fab', 'react'];
    if (n.includes('node')) return ['fab', 'node-js'];
    if (n.includes('python')) return ['fab', 'python'];
    if (n.includes('java') && !n.includes('script')) return ['fab', 'java'];
    if (n.includes('javascript') || n === 'js') return ['fab', 'js'];
    if (n.includes('docker')) return ['fab', 'docker'];
    if (n.includes('aws') || n.includes('amazon')) return ['fab', 'aws'];
    if (n.includes('git') && !n.includes('digital')) return ['fab', 'git-alt'];
    if (n.includes('linux')) return ['fab', 'linux'];
    if (n.includes('html')) return ['fab', 'html5'];
    if (n.includes('css')) return ['fab', 'css3-alt'];
    if (n.includes('php')) return ['fab', 'php'];
    if (n.includes('github')) return ['fab', 'github'];
    if (n.includes('linkedin')) return ['fab', 'linkedin'];
    return null;
  });

  public readonly customSvg = computed<string | null>(() => {
    if (this.imageSrc()) return null;
    const n = this.name().toLowerCase().trim();
    if (n.includes('.net') || n.includes('dotnet') || n.includes('asp.net')) return 'dotnet';
    if (n.includes('c#') || n === 'csharp') return 'csharp';
    if (n.includes('typescript') || n === 'ts') return 'typescript';
    if (n.includes('sql server') || n.includes('mysql') || n.includes('oracle') || n.includes('database')) return 'sqlserver';
    if (n.includes('postgresql')) return 'postgresql';
    if (n.includes('kubernetes')) return 'kubernetes';
    if (n.includes('terraform')) return 'terraform';
    if (n.includes('azure')) return 'azure';
    if (n.includes('mongo')) return 'mongodb';
    if (n.includes('redis')) return 'redis';
    if (n.includes('tailwind')) return 'tailwind';
    return null;
  });

  public readonly faClasses = computed(() => {
    const n = this.name().toLowerCase().trim();
    if (n.includes('angular')) return 'text-red-600 dark:text-red-500';
    if (n.includes('react')) return 'text-cyan-500';
    if (n.includes('node')) return 'text-emerald-600 dark:text-emerald-500';
    if (n.includes('python')) return 'text-amber-500';
    if (n.includes('java') && !n.includes('script')) return 'text-orange-600';
    if (n.includes('docker')) return 'text-sky-500';
    if (n.includes('aws')) return 'text-amber-500';
    if (n.includes('git')) return 'text-orange-500';
    if (n.includes('linux')) return 'text-yellow-500 dark:text-yellow-400';
    if (n.includes('js')) return 'text-yellow-500';
    if (n.includes('html')) return 'text-orange-500';
    if (n.includes('css')) return 'text-blue-500';
    return 'text-zinc-600 dark:text-zinc-400';
  });
}
