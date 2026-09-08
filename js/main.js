/* ============================================
   HYDROHEALTH PROTECT - MAIN JAVASCRIPT
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initScrollReveal();
    initCounters();
    initAccordion();
    initForms();
    initSmoothScroll();
    initNewsletter();
    initDonationCards();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Add scrolled class on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    // Create IntersectionObserver for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                // Format the counter value consistently (no trailing '+' for zero)
                function formatValue(value) {
                    if (value === 0) return '0';
                    if (target >= 1000) return value.toLocaleString() + '+';
                    if (counter.textContent.includes('%')) return value + '%+';
                    return value + '+';
                }
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (easeOutExpo)
                    const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    const currentValue = Math.floor(target * easing);
                    counter.textContent = formatValue(currentValue);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Final value
                        counter.textContent = formatValue(target);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                
                // Stop observing after animation
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/* ============================================
   ACCORDION
   ============================================ */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ============================================
   FORM HANDLING
   ============================================ */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || document.getElementById('name').value;
            const email = formData.get('email') || document.getElementById('email').value;
            
            // Basic validation
            if (!name || !email) {
                showFormMessage(contactForm, 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                showFormMessage(contactForm, 'Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
                showFormMessage(newsletterForm, 'Thank you for subscribing! Check your email for confirmation.', 'success');
                newsletterForm.reset();
            }, 1500);
        });
    }
}

function showFormMessage(form, message, type) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    messageElement.textContent = message;
    messageElement.style.padding = '12px 16px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.marginTop = '16px';
    messageElement.style.textAlign = 'center';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.border = '1px solid #c3e6cb';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.border = '1px solid #f5c6cb';
    }
    
    // Add message after form
    form.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   NEWSLETTER
   ============================================ */
function initNewsletter() {
    // Additional newsletter functionality if needed
    const newsletterSection = document.querySelector('.newsletter-section');
    
    if (newsletterSection) {
        // Add entrance animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(newsletterSection);
    }
}

/* ============================================
   DONATION CARDS
   ============================================ */
function initDonationCards() {
    const donationCards = document.querySelectorAll('.donation-card');
    let selectedAmount = null;
    
    donationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            donationCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get donation amount
            const amountElement = this.querySelector('.amount');
            if (amountElement) {
                selectedAmount = amountElement.textContent;
            }
            
            // Update any donate buttons
            const donateButtons = this.querySelectorAll('button');
            donateButtons.forEach(button => {
                if (selectedAmount) {
                    button.textContent = `Donate ${selectedAmount}`;
                }
            });
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
