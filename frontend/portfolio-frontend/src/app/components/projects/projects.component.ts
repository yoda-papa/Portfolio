import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { SignalRService } from '../../services/signalr.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-projects',
  template: `
    <div class="projects-container">
      <h2>My Projects</h2>
      
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading">
        Loading projects...
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <!-- Content -->
      <ng-container *ngIf="!isLoading && !error">
        <!-- Visitor Count -->
        <div class="visitor-count">
          Current Visitors: {{ visitorCount$ | async }}
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <div *ngFor="let project of projects" class="project-card">
            <img src="{{ project.imageUrl }}" [alt]="project.title">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="technologies">
              <span *ngFor="let tech of project.technologies" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a [href]="project.projectUrl" target="_blank" class="btn">View Project</a>
              <button (click)="editProject(project)" class="btn btn-primary">Edit</button>
              <button (click)="deleteProject(project.id)" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>

        <!-- Add Project Button -->
        <button (click)="showAddProjectForm()" class="btn btn-primary">Add New Project</button>
      </ng-container>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 2rem;
      color: var(--text-color);
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
      color: var(--text-color);
    }

    .error {
      color: var(--danger-color, #dc3545);
    }

    .visitor-count {
      background: var(--section-bg-alt);
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      text-align: right;
      color: var(--text-color);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .project-card {
      background: var(--card-bg);
      border-radius: 8px;
      box-shadow: var(--card-shadow, 0 2px 4px rgba(0,0,0,0.1));
      overflow: hidden;
      transition: transform 0.2s;
      border: 1px solid var(--card-border);
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--card-shadow-hover, 0 4px 8px rgba(0, 0, 0, 0.1));
    }

    .project-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .project-card h3 {
      padding: 1rem;
      margin: 0;
      color: var(--card-title);
    }

    .project-card p {
      padding: 0 1rem;
      color: var(--card-text);
    }

    .technologies {
      padding: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-tag {
      background: var(--neutral-light);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: var(--text-dark);
    }

    body.dark-theme .tech-tag {
      background: var(--neutral-dark);
      color: var(--text-light);
    }

    .project-links {
      padding: 1rem;
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.2s ease, color 0.2s ease;
      
      /* Default button appearance for View Project and Edit */
      background: transparent;
      color: var(--text-color);
      border: 1px solid var(--text-color);
    }

    .btn:hover {
      background: var(--primary-color);
      color: var(--text-light);
      border-color: var(--primary-color);
    }

    .btn-primary {
      background: var(--primary-color);
      color: var(--text-light);
      border: 1px solid var(--primary-color);
    }
    
    .btn-primary:hover {
       background: var(--accent-color); /* Use accent for hover effect */
       border-color: var(--accent-color);
    }

    .btn-danger {
      background: var(--primary-color); /* Make delete button primary color as requested */
      color: var(--text-light);
      border: 1px solid var(--primary-color);
    }
    
    .btn-danger:hover {
       background: var(--accent-color); /* Use accent for hover effect */
       border-color: var(--accent-color);
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  visitorCount$;
  isLoading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private portfolioService: PortfolioService,
    private signalRService: SignalRService,
    private router: Router
  ) {
    this.visitorCount$ = this.signalRService.visitorCount$;
  }

  ngOnInit() {
    // Load projects directly in ngOnInit
    this.loadProjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects() {
    this.portfolioService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          this.isLoading = false;
          this.error = null;
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.error = 'Failed to load projects. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  editProject(project: Project) {
    // Using the simplified route with just the ID
    this.router.navigate(['/projects', 'edit', project.id]);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.portfolioService.deleteProject(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.projects = this.projects.filter(p => p.id !== id);
          },
          error: (error) => {
            console.error('Error deleting project:', error);
            this.error = 'Failed to delete project. Please try again later.';
          }
        });
    }
  }

  showAddProjectForm() {
    this.router.navigate(['/projects/new']);
  }
} 