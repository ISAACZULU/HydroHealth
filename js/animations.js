/* ============================================
   HYDROHEALTH PROTECT - ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations
    initParallaxEffects();
    initHoverEffects();
    initPageLoadAnimations();
    initScrollProgressBar();
});

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBg && heroContent) {
        window.addEventListener('scroll', throttle(function() {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition < window.innerHeight) {
                // Parallax for hero background
                heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                
                // Fade out hero content
                const opacity = 1 - (scrollPosition / (window.innerHeight * 0.7));
                heroContent.style.opacity = Math.max(opacity, 0);
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        }, 16)); // 60fps
    }
}

/* ============================================
   HOVER EFFECTS
   ============================================ */
function initHoverEffects() {
    // Add tilt effect to cards
    const tiltCards = document.querySelectorAll('.solution-card, .impact-card, .donation-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            
            // Reset after transition
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

/* ============================================
   PAGE LOAD ANIMATIONS
   ============================================ */
function initPageLoadAnimations() {
    // Add page transition
    document.body.classList.add('page-transition');
    
    // Animate elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach((element, index) => {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || index * 100;
        
        element.style.animation = `${animationType} 1s ease ${delay}ms forwards`;
        element.style.opacity = '0';
    });
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function initScrollProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = 'var(--teal)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = progress + '%';
    }, 10));
}

/* ============================================
   INTERSECTION OBSERVER FOR STATS
   ============================================ */
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-pulse');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
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

// Export functions for use in other scripts
window.HydroHealthAnimations = {
    initParallaxEffects,
    initHoverEffects,
    initPageLoadAnimations,
    initScrollProgressBar,
    initStatsAnimation
};
