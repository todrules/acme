import {ApplicationConfig, NgZone} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {Platform, setupPlatform} from "../services/platform/platform";
import {COLORS, INIT_THEME, ThemeService} from "../lib/styles/theme";
import {PlatformConfigToken, providePlatformConfigs} from "../services/platform/platform-registry";
import {DOCUMENT} from "@angular/common";
import {HttpClient, provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: INIT_THEME,
      useValue: COLORS
    },
    { provide: PlatformConfigToken, useFactory: providePlatformConfigs },
    // useFactory: ionic core providers
    { provide: Platform, useFactory: setupPlatform, deps: [DOCUMENT, PlatformConfigToken, NgZone] },
    provideRouter(routes)
  ]
};
