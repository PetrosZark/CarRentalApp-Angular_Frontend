import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
    // Optimize change detection with Zone.js by coalescing events (reduces redundant change detection cycles)
    provideZoneChangeDetection({ eventCoalescing: true }), 

    // Provide router configuration for handling application routes
    provideRouter(routes), 

    // Enable asynchronous animations for better performance
    provideAnimationsAsync(),

    // Provide HttpClient and apply interceptors from dependency injection (DI)
    provideHttpClient(withInterceptorsFromDi())
    ]
};
