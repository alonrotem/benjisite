document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const firstSection = document.getElementById('comic-books');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // 1. Programmatically initialize Bootstrap Scrollspy
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#main-navbar',
    smoothScroll: true,
    offset: 100
    });

    function clearNavIfAboveFirstSection() {
    // Calculate the top boundary of the first section taking nav height into account
    const firstSectionTop = firstSection.offsetTop - 120;
    
    if (window.scrollY < firstSectionTop) {
        navLinks.forEach(link => link.classList.remove('active'));
    }
    }

    // 2. Clear highlights on scroll when in hero section
    window.addEventListener('scroll', () => {
    // Handle Back-to-Top Button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    clearNavIfAboveFirstSection();
    });

    // 3. Clear highlights when Scrollspy activates target elements
    window.addEventListener('activate.bs.scrollspy', () => {
    clearNavIfAboveFirstSection();
    });

    // Run an initial check after Scrollspy refreshes
    clearNavIfAboveFirstSection();
});