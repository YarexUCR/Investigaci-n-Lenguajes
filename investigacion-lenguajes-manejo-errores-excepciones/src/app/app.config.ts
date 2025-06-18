import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// Removed provideMatSnackBar as it is not exported from @angular/material/snack-bar
import { GlobalErrorHandler } from './core/handlers/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // Removed provideMatSnackBar from providers array
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
