import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'projects/new', component: ProjectFormComponent },
    { path: 'projects/edit/:id', component: ProjectFormComponent },
    { path: '**', redirectTo: '' }
];
