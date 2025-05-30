import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      /* Add any specific styles for this component if needed */
    `
  ]
})
export class ProjectManagementComponent {
  constructor(
  ) {}
} 