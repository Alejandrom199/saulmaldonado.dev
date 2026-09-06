import { InjectionToken } from '@angular/core';
import { CvProfile } from '../models/cv-profile.model';

export interface ICvDataProvider {
  getProfile(): CvProfile;
}

export const CV_DATA_PROVIDER = new InjectionToken<ICvDataProvider>('CV_DATA_PROVIDER');
