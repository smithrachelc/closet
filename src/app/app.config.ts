import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ Add this line

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient() // ✅ Add this to providers
  ]
};
