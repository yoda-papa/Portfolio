import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="logo">Portfolio</a>
        <div class="nav-links">
          <a routerLink="/projects">Projects</a>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: #333;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-links a {
      text-decoration: none;
      color: #666;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .nav-links a:hover {
      background-color: #f0f0f0;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
  `],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule]
})
export class AppComponent {
  title = 'portfolio-frontend';
} 