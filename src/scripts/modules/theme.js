export class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.themeIcon = this.themeToggle.querySelector('svg');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    // Initialize theme
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Add click event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme(theme) {
    // Remove any existing theme
    document.body.removeAttribute('data-theme');
    
    // Force a reflow
    void document.body.offsetHeight;
    
    // Apply new theme
    document.body.setAttribute('data-theme', theme);
    
    // Update icon
    this.updateIcon(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.currentTheme = newTheme;
    this.applyTheme(newTheme);
  }

  updateIcon(theme) {
    const sunIcon = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    const moonIcon = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    
    this.themeIcon.innerHTML = theme === 'light' ? sunIcon : moonIcon;
  }
} 