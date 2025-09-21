class ThemeSwitcher {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.theme = localStorage.getItem('theme') || 'light';
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.setupEventListeners();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (this.themeToggle) {
      if (theme === 'dark') {
        this.themeToggle.classList.add('dark');
      } else {
        this.themeToggle.classList.remove('dark');
      }
    }
  }

  toggleTheme() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    // Add a class to trigger the animation
    if (this.themeToggle) {
      this.themeToggle.classList.add('animating');
    }

    this.setTheme(this.theme);

    // Remove the animating class after the transition is complete
    setTimeout(() => {
      if (this.themeToggle) {
        this.themeToggle.classList.remove('animating');
      }
      this.isAnimating = false;
    }, 400); // Match the CSS transition duration
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    } else {
      console.warn('Theme toggle button not found - theme switching disabled');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
});
