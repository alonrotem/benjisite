document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const firstSection = document.getElementById('comic-books');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const hamburger = document.getElementById("hamburger-6");
    const mainNavbar = document.getElementById('main-navbar'); // Target your navbar wrapper

    const togglers = document.getElementsByClassName("navbar-toggler");
    const collapsers = document.getElementsByClassName("navbar-collapse");
    const navbarbrands = document.getElementsByClassName("navbar-brand");
    const toggler = (togglers && togglers.length > 0)? togglers[0] : null;
    const collapser = (collapsers && collapsers.length > 0)? collapsers[0] : null;
    const navbarbrand = (navbarbrands && navbarbrands.length > 0)? navbarbrands[0] : null;
    
    // Function to calculate exact navbar height and feed it to CSS
    function updateNavbarHeightOffset() {
        if (mainNavbar) {
            const height = mainNavbar.offsetHeight;
            document.documentElement.style.setProperty('--navbar-height', `${height}px`);
        }
    }
    
    // Run height check on load and window resizing
    updateNavbarHeightOffset();
    window.addEventListener('resize', updateNavbarHeightOffset);

    // 1. Initialize Scrollspy WITHOUT native smoothScroll to fix URL hashes
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#main-navbar',
        offset: mainNavbar ? mainNavbar.offsetHeight + 10 : 100
    });

    function clearNavIfAboveFirstSection() {
        if (!firstSection || !mainNavbar) return;
        // Dynamically use real navbar height instead of hardcoded numbers
        const firstSectionTop = firstSection.offsetTop - (mainNavbar.offsetHeight + 20);
        
        if (window.scrollY < firstSectionTop) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    // 2. Clear highlights on scroll when in hero section
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        clearNavIfAboveFirstSection();
    });

    window.addEventListener('activate.bs.scrollspy', () => {
        clearNavIfAboveFirstSection();
    });

    clearNavIfAboveFirstSection();

    function closeHamburgerMenu(){
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
    }

    if(hamburger) {
        hamburger.addEventListener('click', function(){
            hamburger.classList.toggle("is-active");
        });
    }

    if(navbarbrand){
        navbarbrand.addEventListener('click', () => {
            closeHamburgerMenu();
        });
    }

    // Modern manual scroll/hash management
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only manipulate if it's an internal hash link
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                closeHamburgerMenu();

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Modern native smooth scroll that respects scroll-padding-top
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Force the hash directly into the browser address bar safely
                    history.pushState(null, null, targetId);
                }
            } else {
                closeHamburgerMenu();
            }
        });
    });
});
