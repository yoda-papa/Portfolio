// Security headers and features
const securityHeaders = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

// Utility functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Sanitize user input
const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);

    // Prevent form submission if any
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Sanitize form inputs
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.value = sanitizeInput(input.value);
            });
        });
    });

    // Remove loading state
    const loading = $('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }

    // Mobile menu setup
    // const mobileMenuButton = document.createElement('button');
    // mobileMenuButton.className = 'mobile-menu-button';
    // mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    // mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    // $('.nav-content').appendChild(mobileMenuButton);

    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            menuButton.classList.toggle('open', isOpen);
            menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a link is clicked (for better UX)
        navLinksList.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                menuButton.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth scroll with error handling and security
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Validate target ID to prevent XSS
            if (!/^#[a-zA-Z0-9-]+$/.test(targetId)) {
                console.error('Invalid target ID');
                return;
            }
            const target = $(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without page reload
                history.pushState(null, null, targetId);
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Optimized scroll handling with debounce
    const handleScroll = debounce(() => {
        // Navbar background
        const navbar = $('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        // Back to top button visibility
        const backToTop = $('.back-to-top');
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections with error handling
    try {
        $$('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(section);
        });
    } catch (error) {
        console.error('Error setting up section animations:', error);
    }

    // Image loading optimization with error handling
    $$('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                img.alt = 'Failed to load image';
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
            });
        }
    });

    // Project card hover effects with performance optimization
    $$('.project-card').forEach(card => {
        const handleHover = (e) => {
            if (e.type === 'mouseenter') {
                card.style.transform = 'translateY(-5px)';
            } else {
                card.style.transform = 'translateY(0)';
            }
        };

        card.addEventListener('mouseenter', handleHover);
        card.addEventListener('mouseleave', handleHover);
    });

    // Update footer year
    const footerYear = $('.footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', new Date().getFullYear());
    }

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.style.animationPlayState = 'paused';
        } else {
            document.body.style.animationPlayState = 'running';
        }
    });

    // Prevent right-click on images
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Disable text selection on certain elements
    $$('.logo, .nav-links a, .social-links a').forEach(element => {
        element.style.userSelect = 'none';
    });
}); 