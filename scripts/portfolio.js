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

    const  hamburger = document.getElementById("hamburger-6");
    const togglers = document.getElementsByClassName("navbar-toggler");
    const collapsers = document.getElementsByClassName("navbar-collapse");
    const toggler = (togglers && togglers.length > 0)? togglers[0] : null;
    const collapser = (collapsers && collapsers.length > 0)? collapsers[0] : null;
    const navMenu = document.querySelector('.nav-menu');
    if(hamburger) {
        hamburger.addEventListener('click', function(){
            hamburger.classList.toggle("is-active");
        });
    }    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(toggler){
                toggler.classList.add("collapsed");
                toggler.setAttribute("aria-expanded", false);
            }
            if(collapser){
                collapser.classList.remove("show");
            }
            if(hamburger){
                hamburger.classList.remove("is-active");
            }
        });
    });
});