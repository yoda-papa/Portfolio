import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume';
// import { RouterLink } from '@angular/router'; // RouterLink is not used

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero py-5" data-aos="fade-up">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h1 class="display-4 fw-bold mb-3">Harshit Kumar</h1>
            <p class="lead mb-4">Full Stack Developer</p>
            <div class="contact-info d-flex justify-content-center gap-4 flex-wrap">
              <a href="mailto:harshit2hk&#64;gmail.com" class="contact-link">
                <i class="bi bi-envelope me-2"></i> harshit2hk&#64;gmail.com
              </a>
              <a href="tel:8299446362" class="contact-link">
                <i class="bi bi-telephone me-2"></i> 8299446362
              </a>
              <a href="https://www.linkedin.com/in/harshit-kumar41/" target="_blank" class="contact-link">
                <i class="bi bi-linkedin me-2"></i> LinkedIn
              </a>
            </div>
            <button class="btn btn-primary mt-4" (click)="resumeService.downloadResume()">Download Resume</button>
          </div>
        </div>
      </div>
    </section>

    <section class="summary py-5" data-aos="fade-up">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="text-center mb-4 section-title">Professional Summary</h2>
            <p class="lead text-center">Full Stack Developer with 3+ years of experience building enterprise and consumer web applications using Angular, .NET, SQL, and TypeScript. Delivered 10+ monthly transactions for a marketplace platform and improved underwriter productivity by 20% for an insurance enterprise tool. Adept at full lifecycle development in Agile environments.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="skills py-5" data-aos="fade-up">
      <div class="container">
        <h2 class="text-center mb-5 section-title">Technical Skills</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Frontend</h3>
                <ul class="list-unstyled">
                  <li class="mb-2">HTML5, CSS3, Bootstrap</li>
                  <li class="mb-2">JavaScript (ES6+), TypeScript</li>
                  <li>Angular 12+</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Backend</h3>
                <ul class="list-unstyled">
                  <li class="mb-2">.NET Core, C#</li>
                  <li class="mb-2">RESTful APIs</li>
                  <li>ASP.NET Core, Entity Framework</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Databases</h3>
                <ul class="list-unstyled">
                  <li class="mb-2">SQL Server, MySQL</li>
                  <li>Database Optimization</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Tools & Methodologies</h3>
                <ul class="list-unstyled">
                  <li class="mb-2">Git, Azure DevOps, Postman</li>
                  <li class="mb-2">Visual Studio</li>
                  <li>Agile/Scrum, TDD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="experience py-5" data-aos="fade-up">
      <div class="container">
        <h2 class="text-center mb-5 section-title">Professional Experience</h2>
        
        <!-- View Toggle -->
        <div class="text-center mb-4">
          <button class="btn btn-outline-primary me-2" (click)="toggleExperienceView('timeline')" [class.active]="experienceView === 'timeline'">Timeline View</button>
          <button class="btn btn-outline-primary" (click)="toggleExperienceView('list')" [class.active]="experienceView === 'list'">List View</button>
        </div>

        <!-- Timeline View -->
        <div *ngIf="experienceView === 'timeline'" class="timeline-container">
          <!-- Timeline items will go here -->
          <div class="timeline-item" *ngFor="let job of professionalExperience; let i = index" data-aos="fade-up" [attr.data-aos-delay]="i * 100">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>{{ job.title }}</h3>
              <p>{{ job.company }}</p>
              <span class="duration">{{ job.duration }}</span>
              <ul>
                <li *ngFor="let responsibility of job.responsibilities">{{ responsibility }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- List View (Existing Cards) -->
        <div *ngIf="experienceView === 'list'" class="list-view">
          
          <div class="card mb-4" *ngFor="let job of professionalExperience; let i = index" data-aos="fade-up" [attr.data-aos-delay]="i * 100">
            <div class="card-body">
              <h3 class="card-title h4">{{ job.title }}</h3>
              <h4 class="card-subtitle mb-3">{{ job.company }} | {{ job.duration }}</h4>
              <ul class="list-unstyled">
                <li *ngFor="let responsibility of job.responsibilities" class="mb-2">{{ responsibility }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="education py-5" data-aos="fade-up">
      <div class="container">
        <h2 class="text-center mb-5 section-title">Education</h2>
        <div class="row justify-content-center">
          <div class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-body">
              <h3 class="card-title h4">Bachelor of Technology in Computer Science</h3>
              <h4 class="card-subtitle mb-2">Pranveer Singh Institute of Technology, Kanpur Nagar, UP</h4>
              <p class="card-text">Graduated: 2021</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="projects py-5" data-aos="fade-up">
      <div class="container">
        <h2 class="text-center mb-5 section-title">Key Projects</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h4">Marketplace Platform</h3>
                <p class="tech-stack mb-3">Angular, JavaScript, SQL</p>
                <p class="card-text">Delivered a scalable project marketplace handling 10+ transactions/month, leveraging Angular for frontend and .NET Core microservices.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h4">Instinct Roster Management</h3>
                <p class="tech-stack mb-3">Angular, TypeScript, .NET</p>
                <p class="card-text">Built a real-time scheduling app used by 50+ users, reducing manual workload by 15 hours/week through automated workflows.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h4">Underwriting Application</h3>
                <p class="tech-stack mb-3">Angular, SQL, .NET</p>
                <p class="card-text">Engineered an enterprise application for insurance risk assessment, adopted by 100+ underwriters to evaluate 1K+ policies monthly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  experienceView: 'list' | 'timeline' = 'list'; // Default to list view

  professionalExperience: ExperienceItem[] = [
    {
      title: 'Full Stack Developer',
      company: 'Maereken',
      duration: '2024 – Present',
      responsibilities: [
        '• Orchestrated end-to-end development of a marketplace platform, enabling 10+ monthly transactions through seamless integration of Angular frontend and .NET Core APIs.',
        '• Enhanced SQL query efficiency, cutting load times by 20% via indexed queries and optimized joins, improving scalability for 50+ product listings.',
        '• Developed adaptive UI components using Bootstrap & Angular, boosting user retention by 25% through improved navigation flow and cross-device optimization.',
        '• Integrated secure authentication, payment gateway, and real-time notifications, implemented OAuth-based authentication ensuring seamless, secure and instant transactions.'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup',
      duration: '2023 – 2024',
      responsibilities: [
        '• Architected and deployed Instinct, a roster management app, supporting 50+ daily users by implementing real-time Angular frontend and .NET Core backend.',
        '• Reduced manual data entry by 10 hours/week through automation of scheduling workflows using TypeScript and SQL triggers.',
        '• Enhanced API performance by 35% by refactoring .NET code, achieving 99% uptime via rigorous load testing.'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Coforge',
      duration: '2021 – 2023',
      responsibilities: [
        '• Spearheaded development of Underwriting, an enterprise insurance risk assessment tool, improving underwriter productivity by 20% through Angular-driven dynamic workflows.',
        '• Designed SQL Server database schemas, slashing report generation time by 30% for 10+ daily users.',
        '• Integrated RESTful APIs with third-party risk-data providers, reducing policy evaluation time from 2 hours to 15 minutes.',
        '• Collaborated with the design team to enhance usability and develop an intuitive frontend using Angular, HTML5, and CSS.'
      ]
    }
  ];

  constructor(public resumeService: ResumeService) { }

  toggleExperienceView(view: 'list' | 'timeline') {
    this.experienceView = view;
  }
} 