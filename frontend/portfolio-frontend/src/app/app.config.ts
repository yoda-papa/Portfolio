import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { PortfolioService } from './services/portfolio.service';
import { SignalRService } from './services/signalr.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    PortfolioService,
    SignalRService
  ]
};
