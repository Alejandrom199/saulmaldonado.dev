import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CV_DATA_PROVIDER } from './core/tokens/cv-data.token';
import { CvProfile } from './core/models/cv-profile.model';
import { HeroComponent } from './features/hero/hero.component';
import { SummaryComponent } from './features/summary/summary.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { SkillsComponent } from './features/skills/skills.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { EducationComponent } from './features/education/education.component';
import { LanguagesComponent } from './features/languages/languages.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { TooltipDirective } from './shared/directives/tooltip.directive';
import { ToastService } from './core/services/toast.service';

export type CvTabId = 'sobre-mi' | 'experiencia' | 'habilidades' | 'estudios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HeroComponent,
    SummaryComponent,
    ExperienceComponent,
    SkillsComponent,
    CertificationsComponent,
    EducationComponent,
    LanguagesComponent,
    ToastComponent,
    ThemeToggleComponent,
    TooltipDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Dependency Inversion Principle: Injected via token
  private readonly cvDataProvider = inject(CV_DATA_PROVIDER);
  private readonly toastService = inject(ToastService);
  
  // Profile data
  public readonly profile: CvProfile = this.cvDataProvider.getProfile();

  // Active Tab state: 'sobre-mi' is the first tab by default
  public readonly activeTab = signal<CvTabId>('sobre-mi');

  public readonly currentYear = new Date().getFullYear();

  public setActiveTab(tab: CvTabId): void {
    this.activeTab.set(tab);
  }

  public copyEmail(): void {
    const email = this.profile.contact.email;
    navigator.clipboard.writeText(email).then(() => {
      this.toastService.show(`Email copiado: ${email}`);
    }).catch(() => {
      this.toastService.show('No se pudo copiar automáticamente', 'info');
    });
  }

  public copyPhone(): void {
    const phone = this.profile.contact.phoneFormatted;
    navigator.clipboard.writeText(phone).then(() => {
      this.toastService.show(`Teléfono copiado: ${phone}`);
    }).catch(() => {
      this.toastService.show('No se pudo copiar automáticamente', 'info');
    });
  }

  public onTabMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }

  public onTabMouseLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.style.setProperty('--mouse-x', '-200px');
    target.style.setProperty('--mouse-y', '-200px');
  }
}
