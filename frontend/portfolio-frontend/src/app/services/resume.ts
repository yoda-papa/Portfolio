import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor() { }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf'; // Path to your resume PDF in the assets folder
    link.download = 'Harshit_Kumar_Resume.pdf'; // Suggested filename for download
    link.click();
  }
}
