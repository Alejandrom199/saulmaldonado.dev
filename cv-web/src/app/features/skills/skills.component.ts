import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SkillGroup, SkillCategory } from '../../core/models/cv-profile.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

interface FilterItem {
  readonly id: SkillCategory;
  readonly label: string;
  readonly icon: IconProp;
  readonly count: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  host: { class: 'block' },
  imports: [CommonModule, FormsModule, FontAwesomeModule, SectionCardComponent, TechBadgeComponent],
  template: `
    <section class="py-2 page-break-inside-avoid">
      
      <!-- Top Filters & Search Toolbar: Clean & Well-Organized -->
      <div class="no-print flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        
        <!-- Category Filter Tabs: Clean, ordered, concise -->
        <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
          @for (cat of categoryList(); track cat.id) {
            <button 
              type="button" 
              (click)="selectCategory(cat.id)"
              class="text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none"
              [class.bg-zinc-900]="activeCategory() === cat.id"
              [class.text-white]="activeCategory() === cat.id"
              [class.dark:bg-zinc-100]="activeCategory() === cat.id"
              [class.dark:text-zinc-950]="activeCategory() === cat.id"
              [class.shadow-xs]="activeCategory() === cat.id"
              [class.bg-white]="activeCategory() !== cat.id"
              [class.dark:bg-zinc-900]="activeCategory() !== cat.id"
              [class.border]="activeCategory() !== cat.id"
              [class.border-zinc-200/80]="activeCategory() !== cat.id"
              [class.dark:border-zinc-800]="activeCategory() !== cat.id"
              [class.text-zinc-600]="activeCategory() !== cat.id"
              [class.dark:text-zinc-400]="activeCategory() !== cat.id"
              [class.hover:border-zinc-300]="activeCategory() !== cat.id"
              [class.dark:hover:border-zinc-700]="activeCategory() !== cat.id">
              <fa-icon [icon]="cat.icon" class="text-xs"></fa-icon>
              <span>{{ cat.label }}</span>
              <span 
                class="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-md"
                [class.bg-white/20]="activeCategory() === cat.id"
                [class.text-white]="activeCategory() === cat.id"
                [class.dark:bg-zinc-900/20]="activeCategory() === cat.id"
                [class.dark:text-zinc-900]="activeCategory() === cat.id"
                [class.bg-zinc-100]="activeCategory() !== cat.id"
                [class.dark:bg-zinc-800]="activeCategory() !== cat.id"
                [class.text-zinc-400]="activeCategory() !== cat.id"
                [class.dark:text-zinc-500]="activeCategory() !== cat.id">
                {{ cat.count }}
              </span>
            </button>
          }
        </div>

        <!-- Live Search with quick clear -->
        <div class="relative shrink-0 w-full sm:w-60">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Filtrar tecnologías..."
            class="text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl px-4 py-2 pl-9 pr-8 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600 transition-all w-full shadow-2xs"
          />
          <fa-icon [icon]="['fas', 'code']" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs sm:text-sm"></fa-icon>
          @if (searchQuery()) {
            <button 
              type="button" 
              (click)="searchQuery.set('')"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs cursor-pointer p-0.5"
              aria-label="Limpiar búsqueda">
              ✕
            </button>
          }
        </div>
      </div>

      <!-- Skills Bento Grid with Official Tech Logos (No text names, Tooltip on hover) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        @for (group of filteredGroups(); track group.id) {
          <app-section-card padding="lg" variant="default">
            <div class="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-zinc-100 dark:border-zinc-800/60">
              <h3 class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                <fa-icon [icon]="getCategoryIcon(group.id)" class="text-zinc-500 text-sm sm:text-base"></fa-icon>
                <span>{{ group.title }}</span>
              </h3>
              <span class="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500">
                {{ group.items.length }}
              </span>
            </div>

            <!-- Tech Icons Only with Tooltips (Rendered via TechBadgeComponent with border-0) -->
            <div class="flex flex-wrap gap-2.5">
              @for (item of group.items; track item.name) {
                <app-tech-badge 
                  [name]="item.name" 
                  width="w-11 sm:w-12" 
                  height="h-11 sm:h-12">
                </app-tech-badge>
              }
            </div>
          </app-section-card>
        }
      </div>

      @if (filteredGroups().length === 0) {
        <div class="text-center py-12 text-sm text-zinc-500">
          No se encontraron tecnologías para "{{ searchQuery() }}"
        </div>
      }
    </section>
  `
})
export class SkillsComponent {
  public readonly skillGroups = input.required<readonly SkillGroup[]>();

  public readonly activeCategory = signal<SkillCategory>('all');
  public readonly searchQuery = signal<string>('');

  public selectCategory(cat: SkillCategory): void {
    this.activeCategory.set(cat);
  }

  public getCategoryIcon(id: string): IconProp {
    switch (id) {
      case 'backend':
        return ['fas', 'server'];
      case 'frontend':
        return ['fas', 'code'];
      case 'database':
        return ['fas', 'database'];
      case 'cloud-devops':
        return ['fas', 'microchip'];
      case 'languages':
        return ['fas', 'terminal'];
      case 'tools':
        return ['fas', 'cubes'];
      default:
        return ['fas', 'layer-group'];
    }
  }

  public readonly totalSkillsCount = computed(() => {
    return this.skillGroups().reduce((acc, g) => acc + g.items.length, 0);
  });

  public readonly categoryList = computed<readonly FilterItem[]>(() => {
    const groups = this.skillGroups();
    const total = this.totalSkillsCount();

    const categoryMap: Record<SkillCategory, { label: string; icon: IconProp }> = {
      'all': { label: 'Todas', icon: ['fas', 'layer-group'] },
      'backend': { label: 'Backend', icon: ['fas', 'server'] },
      'frontend': { label: 'Frontend', icon: ['fas', 'code'] },
      'database': { label: 'Bases de Datos', icon: ['fas', 'database'] },
      'cloud-devops': { label: 'Cloud & DevOps', icon: ['fas', 'microchip'] },
      'languages': { label: 'Lenguajes', icon: ['fas', 'terminal'] },
      'tools': { label: 'Herramientas', icon: ['fas', 'cubes'] }
    };

    const allItem: FilterItem = {
      id: 'all',
      label: categoryMap['all'].label,
      icon: categoryMap['all'].icon,
      count: total
    };

    const groupItems: FilterItem[] = groups.map(g => ({
      id: g.id,
      label: categoryMap[g.id]?.label ?? g.title,
      icon: this.getCategoryIcon(g.id),
      count: g.items.length
    }));

    return [allItem, ...groupItems];
  });

  public readonly filteredGroups = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.activeCategory();

    return this.skillGroups()
      .filter(group => category === 'all' || group.id === category)
      .map(group => {
        if (!query) return group;
        const matchingItems = group.items.filter(item => 
          item.name.toLowerCase().includes(query)
        );
        return { ...group, items: matchingItems };
      })
      .filter(group => group.items.length > 0);
  });
}
