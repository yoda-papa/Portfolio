import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-project-form',
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Project' : 'Add New Project' }}</h2>
      
      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" type="text" formControlName="title" class="form-control">
          <div *ngIf="projectForm.get('title')?.errors?.['required'] && projectForm.get('title')?.touched" class="error">
            Title is required
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" class="form-control" rows="4"></textarea>
          <div *ngIf="projectForm.get('description')?.errors?.['required'] && projectForm.get('description')?.touched" class="error">
            Description is required
          </div>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input id="imageUrl" type="url" formControlName="imageUrl" class="form-control">
        </div>

        <div class="form-group">
          <label for="projectUrl">Project URL</label>
          <input id="projectUrl" type="url" formControlName="projectUrl" class="form-control">
        </div>

        <div class="form-group">
          <label for="technologies">Technologies (comma-separated)</label>
          <input id="technologies" type="text" formControlName="technologies" class="form-control">
        </div>

        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input id="startDate" type="date" formControlName="startDate" class="form-control">
        </div>

        <div class="form-group">
          <label for="endDate">End Date</label>
          <input id="endDate" type="date" formControlName="endDate" class="form-control">
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="isActive">
            Active Project
          </label>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="projectForm.invalid" class="btn btn-primary">
            {{ isEditMode ? 'Update' : 'Create' }} Project
          </button>
          <button type="button" (click)="onCancel()" class="btn">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private portfolioService: PortfolioService) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      projectUrl: [''],
      technologies: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.projectId = +id;
          return this.portfolioService.getProject(this.projectId).pipe(
            tap(project => {
              // Convert technologies array to comma-separated string for form
              this.projectForm.patchValue({
                ...project,
                technologies: project.technologies.join(', '),
                // Convert Date objects to string for date input compatibility
                startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
              });
            }),
            catchError(error => {
              console.error('Error fetching project:', error);
              // Handle error, maybe navigate back to list
              this.router.navigate(['/projects']);
              return of(undefined);
            })
          );
        } else {
          this.isEditMode = false;
          this.projectId = null;
          return of(undefined); // Not in edit mode
        }
      })
    ).subscribe();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const project: Project = {
        ...formValue,
        id: this.projectId ?? 0, // Use projectId for updates, 0 for new
        technologies: formValue.technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech !== ''),
        // Convert date strings back to Date objects (or appropriate format for backend)
        startDate: new Date(formValue.startDate),
        endDate: formValue.endDate ? new Date(formValue.endDate) : null,
      };

      if (this.isEditMode && this.projectId) {
        this.portfolioService.updateProject(this.projectId, project).pipe(
          catchError(error => {
            console.error('Error updating project:', error);
            // Handle error
            return of(null);
          })
        ).subscribe(() => {
          console.log('Project updated successfully');
          this.router.navigate(['/projects']);
        });
      } else if (!this.isEditMode) {
        this.portfolioService.createProject(project).pipe(
          catchError(error => {
            console.error('Error creating project:', error);
            // Handle error
            return of(null);
          })
        ).subscribe(() => {
          console.log('Project created successfully');
          this.router.navigate(['/projects']);
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }
} 