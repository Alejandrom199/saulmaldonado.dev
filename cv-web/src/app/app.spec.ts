import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { CV_DATA_PROVIDER } from './core/tokens/cv-data.token';
import { CvDataService } from './core/services/cv-data.service';
import { IconCentralService } from './core/services/icon-central.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: CV_DATA_PROVIDER,
          useClass: CvDataService
        }
      ]
    }).compileComponents();

    const iconService = TestBed.inject(IconCentralService);
    iconService.initIcons();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render profile name in h1', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Saúl Alejandro Maldonado López');
  });

  it('should have work experiences populated', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.profile.experiences.length).toBeGreaterThan(0);
    expect(app.profile.experiences[0].company).toBe('Viamatica');
  });

  it('should toggle active tabs', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.activeTab()).toBe('sobre-mi');
    app.setActiveTab('experiencia');
    expect(app.activeTab()).toBe('experiencia');
  });
});
