import { Routes } from '@angular/router';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    {
        path: 'projects',
        component: ProjectManagementComponent,
        children: [
            { path: '', component: ProjectsComponent }, // Default view for /projects
            { path: 'new', component: ProjectFormComponent }, // Route for adding a new project
            { path: ':id', component: ProjectFormComponent } // Route for editing a project
        ]
    },
    { path: '**', redirectTo: '/projects' }
];
