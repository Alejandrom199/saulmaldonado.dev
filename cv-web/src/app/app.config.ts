import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { CV_DATA_PROVIDER } from './core/tokens/cv-data.token';
import { CvDataService } from './core/services/cv-data.service';
import { IconCentralService } from './core/services/icon-central.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: CV_DATA_PROVIDER,
      useExisting: CvDataService
    },
    provideAppInitializer(() => {
      const iconService = inject(IconCentralService);
      iconService.initIcons();
    })
  ]
};
