import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }         from '@angular/platform-browser';
import { BrowserModule }               from '@angular/platform-browser';
import { RouterModule }                from '@angular/router';
import { provideHttpClient }           from '@angular/common/http';
import { provideAnimations }           from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent }  from './app/app.component';
import { appRoutes }     from './app/app.routes';
import { environment }   from './environments/environment';

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
  .catch(err => console.error(err));