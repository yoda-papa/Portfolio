import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { ResumeService } from './services/resume';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a routerLink="/" class="navbar-brand">Portfolio</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/projects" routerLinkActive="active">Projects</a>
            </li>
            <li class="nav-item">
              <button class="nav-link btn btn-link" (click)="resumeService.downloadResume()">Download Resume</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <!-- Theme toggle button fixed to bottom right -->
    <button class="theme-toggle-button" (click)="toggleTheme()">
      <i class="bi" [class.bi-sun]="!isDarkTheme()" [class.bi-moon]="isDarkTheme()"></i>
    </button>

    <footer>
      <div class="container text-center py-3">
        <p>&copy; {{ currentYear }} Harshit Kumar. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .navbar {
      background-color: var(--navbar-bg) !important;
      box-shadow: var(--navbar-shadow);
      border-bottom: 1px solid var(--navbar-border);
    }

    .navbar-brand {
      color: var(--navbar-text) !important;
      font-size: 1.5rem;
      font-weight: bold;
      margin-left: 0;
    }

    .navbar-nav {
      margin-right: 0;
    }

    .nav-link {
       color: var(--navbar-text) !important;
       transition: color 0.2s ease;
    }

    .nav-link:hover {
      color: var(--navbar-link-hover) !important;
    }

    .nav-link.active {
      font-weight: bold;
      color: var(--navbar-link-active) !important;
    }

    /* Style for the download resume button in navbar */
    .navbar .btn-link {
      color: var(--navbar-text) !important; /* Ensure color matches nav links */
      text-decoration: none; /* Remove underline */
      padding: 0.5rem 1rem; /* Match padding of nav links */
    }

    /* Adjust padding and margin for alignment in collapsed menu */
    @media (max-width: 991.98px) {
      .navbar .btn-link {
        padding: 0.5rem 0;
        margin-left: 0;
      }
    }

    .navbar .btn-link:hover {
       color: var(--navbar-link-hover) !important; /* Ensure hover color matches nav links */
       text-decoration: underline; /* Add underline on hover */
    }

    /* Style for the hamburger menu icon */
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h22M4 15h22M4 22h22'/%3E%3C/svg%3E") !important;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      color: var(--text-color);
    }

    .theme-toggle-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--card-bg);
      color: var(--text-color);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: var(--card-shadow);
      transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
      z-index: 1000;
    }

    .theme-toggle-button i {
      font-size: 1.5rem;
    }

    body.dark-theme .theme-toggle-button {
      background-color: var(--card-bg);
      color: var(--text-color);
      box-shadow: var(--card-shadow);
    }

    footer {
      background-color: var(--footer-bg);
      color: var(--footer-text);
      margin-top: 4rem;
      border-top: 1px solid var(--footer-border-top);
    }

    footer .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'portfolio-frontend';
  currentYear = new Date().getFullYear();

  constructor(
    private themeService: ThemeService,
    public resumeService: ResumeService
  ) { }

  ngOnInit() {
    // Initialize theme on component load
    // The service handles getting the initial theme from localStorage/system preference
    // and applies the class to the body in its constructor.
    
    // Initialize AOS
    AOS.init();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }
} 