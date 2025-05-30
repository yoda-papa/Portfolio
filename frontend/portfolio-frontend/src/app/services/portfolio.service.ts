import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:5102/api';

  constructor(private http: HttpClient) { }

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/Projects`).pipe(
      tap(() => {}),
      map(projects => {
        return projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          projectUrl: project.projectUrl,
          technologies: project.technologies,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : undefined,
          isActive: project.isActive
        }));
      }),
      catchError(error => {
        console.error('Error fetching projects:', error);
        return throwError(() => new Error('Failed to load projects.'));
      })
    );
  }

  // Get a single project
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/Projects/${id}`).pipe(
      tap(() => {}),
      map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl,
        technologies: project.technologies,
        startDate: new Date(project.startDate),
        endDate: project.endDate ? new Date(project.endDate) : undefined,
        isActive: project.isActive
      })),
      catchError(error => {
        console.error(`Error fetching project with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to load project with ID ${id}.`));
      })
    );
  }

  // Create a new project
  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    const projectCreateDto = {
      Title: project.title,
      Description: project.description,
      ImageUrl: project.imageUrl,
      ProjectUrl: project.projectUrl,
      Technologies: project.technologies,
      StartDate: project.startDate,
      EndDate: project.endDate,
      IsActive: project.isActive
    };

    return this.http.post<Project>(`${this.apiUrl}/Projects`, projectCreateDto).pipe(
      tap(() => {}),
      catchError(error => {
        console.error('Error creating project:', error);
        return throwError(() => new Error('Failed to create project.'));
      })
    );
  }

  // Update a project
  updateProject(id: number, project: Project): Observable<void> {
    const projectDto = {
      Id: project.id,
      Title: project.title,
      Description: project.description,
      ImageUrl: project.imageUrl,
      ProjectUrl: project.projectUrl,
      Technologies: project.technologies,
      StartDate: project.startDate,
      EndDate: project.endDate,
      IsActive: project.isActive
    };

    return this.http.put<void>(`${this.apiUrl}/Projects/${id}`, projectDto).pipe(
      tap(() => {}),
      catchError(error => {
        console.error(`Error updating project with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to update project with ID ${id}.`));
      })
    );
  }

  // Delete a project
  deleteProject(id: number): Observable<void> {
    if (id === undefined || id === null) {
      console.error('Attempted to delete project with undefined or null ID.');
      return throwError(() => new Error('Project ID is required for deletion.'));
    }
    return this.http.delete<void>(`${this.apiUrl}/Projects/${id}`).pipe(
      tap(() => {}),
      catchError(error => {
        console.error(`Error deleting project with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to delete project with ID ${id}.`));
      })
    );
  }
} 