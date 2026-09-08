/* ============================================
   HYDROHEALTH PROTECT - NAVIGATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced navigation functionality
    const navbar = document.getElementById('navbar');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarToggle = document.getElementById('navbarToggle');
    
    // Handle scroll behavior
    let lastScrollPosition = 0;
    let isNavbarVisible = true;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScrollPosition = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {
            // Scrolling down
            if (isNavbarVisible && !navbarMenu.classList.contains('active')) {
                navbar.style.transform = 'translateY(-100%)';
                isNavbarVisible = false;
            }
        } else {
            // Scrolling up
            if (!isNavbarVisible) {
                navbar.style.transform = 'translateY(0)';
                isNavbarVisible = true;
            }
        }
        
        lastScrollPosition = currentScrollPosition;
    }, 100));
    
    // Add transition to navbar
    navbar.style.transition = 'transform 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease';
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            resetHamburger();
        }
    });
    
    function resetHamburger() {
        if (navbarToggle) {
            const spans = navbarToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Add active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Dropdown functionality for mobile
    const dropdownParents = document.querySelectorAll('.navbar-menu li');
    
    dropdownParents.forEach(parent => {
        const dropdown = parent.querySelector('.dropdown-menu');
        
        if (dropdown && window.innerWidth <= 768) {
            parent.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
                dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
                dropdown.style.transform = dropdown.style.transform === 'translateY(0)' ? 'translateY(10px)' : 'translateY(0)';
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
        });
    });
    
    // Utility: Throttle function
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
});
