// The Core BCI - Greyscale Minimalistic Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
    initializeScrollProgress();
    initializeCTAButtons();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Update active link immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active navigation link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    
    function updateActiveNavLink() {
        let current = '';
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Initialize CTA buttons in hero section
 */
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Initialize social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.textContent.toLowerCase();
            let url = '#';
            
            // In a real application, these would be actual social media URLs
            switch(platform) {
                case 'facebook':
                    url = 'https://facebook.com/thecorebci';
                    break;
                case 'twitter':
                    url = 'https://twitter.com/thecorebci';
                    break;
                case 'linkedin':
                    url = 'https://linkedin.com/company/thecorebci';
                    break;
                case 'instagram':
                    url = 'https://instagram.com/thecorebci';
                    break;
            }
            
            showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)} page...`, 'info');
            
            // In a real app, this would open the actual social media page
            setTimeout(() => {
                console.log(`Would open: ${url}`);
            }, 1000);
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu on window resize if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));
}

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') ? formData.get('name').trim() : '';
        const email = formData.get('email') ? formData.get('email').trim() : '';
        const subject = formData.get('subject') ? formData.get('subject').trim() : '';
        const message = formData.get('message') ? formData.get('message').trim() : '';
        
        // Validate form
        const validation = validateContactForm(name, email, subject, message);
        
        if (!validation.isValid) {
            showNotification(validation.message, 'error');
            return;
        }
        
        // Submit form
        submitContactForm(contactForm, { name, email, subject, message });
    });
}

/**
 * Validate contact form data
 */
function validateContactForm(name, email, subject, message) {
    if (!name) {
        return { isValid: false, message: 'Please enter your name.' };
    }
    
    if (name.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters long.' };
    }
    
    if (!email) {
        return { isValid: false, message: 'Please enter your email address.' };
    }
    
    if (!isValidEmail(email)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    
    if (!subject) {
        return { isValid: false, message: 'Please enter a subject.' };
    }
    
    if (subject.length < 3) {
        return { isValid: false, message: 'Subject must be at least 3 characters long.' };
    }
    
    if (!message) {
        return { isValid: false, message: 'Please enter your message.' };
    }
    
    if (message.length < 10) {
        return { isValid: false, message: 'Message must be at least 10 characters long.' };
    }
    
    return { isValid: true };
}

/**
 * Submit contact form
 */
function submitContactForm(form, data) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted successfully:', data);
        
    }, 2000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animationElements = [
        '.section-header',
        '.hero-content',
        '.about-description',
        '.stat-item',
        '.service-card',
        '.work-card',
        '.testimonial-content',
        '.contact-content'
    ];
    
    animationElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
    });
    
    // Stagger animation for grid items
    const gridContainers = ['.stats-grid', '.services-grid', '.works-grid'];
    
    gridContainers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            const items = container.children;
            Array.from(items).forEach((item, index) => {
                item.classList.add('fade-in-up');
                item.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }
    });
    
    // Add hover effects to cards
    addCardHoverEffects();
}

/**
 * Add hover effects to cards
 */
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .work-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Initialize scroll progress indicator
 */
function initializeScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #666666, #000000);
        transform-origin: 0%;
        z-index: 9999;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(updateScrollProgress, 16));
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
        
        progressBar.style.transform = `scaleX(${Math.min(Math.max(scrollPercent, 0), 1)})`;
    }
}

/**
 * Show notification with greyscale styling
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" type="button">&times;</button>
        </div>
    `;
    
    // Apply greyscale styles directly
    const baseStyles = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    let typeStyles = '';
    switch(type) {
        case 'success':
            typeStyles = 'background-color: #000000;'; // Black for success
            break;
        case 'error':
            typeStyles = 'background-color: #666666;'; // Dark grey for error
            break;
        default:
            typeStyles = 'background-color: #999999;'; // Medium grey for info
    }
    
    notification.style.cssText = baseStyles + typeStyles;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    const autoHideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Manual close
    closeButton.addEventListener('click', () => {
        clearTimeout(autoHideTimeout);
        hideNotification(notification);
    });
}

/**
 * Hide notification
 */
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Utility function to throttle function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize keyboard navigation for accessibility
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Enhanced tab navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Handle window resize for responsive updates
 */
function handleWindowResize() {
    window.addEventListener('resize', throttle(() => {
        // Update any responsive calculations
        const navbar = document.getElementById('navbar');
        if (navbar && window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    }, 250));
}

/**
 * Initialize error handling
 */
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Application error:', e.error);
        // In production, you might want to send errors to a logging service
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardNavigation();
    handleWindowResize();
    initializeErrorHandling();
});

// Handle page load
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize scroll position if there's a hash
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    console.log('The Core BCI greyscale application loaded successfully');
});