/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */

// Media Query Breakpoints (sesuai dengan CSS)
const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};

// Media Query Handlers
const mediaQueries = {
    sm: window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px)`),
    md: window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`),
    lg: window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`),
    xl: window.matchMedia(`(min-width: ${BREAKPOINTS.xl}px)`)
};

// Component Classes
const CLASSES = {
    sections: {
        page: 'page-section',
        active: 'active',
        expanded: 'expanded'
    },
    navbar: {
        base: 'navbar',
        shrink: 'navbar-shrink',
        dark: 'navbar-dark',
        light: 'navbar-light',
        expanded: 'navbar-expanded'
    },
    brand: {
        logo: 'brand-logo',
        text: 'brand-text',
        small: 'brand-text-small',
        large: 'brand-text-large'
    },
    footer: {
        base: 'footer',
        social: 'social-link',
        link: 'footer-link'
    },
    cookie: {
        banner: 'cookie-consent',
        button: 'cookie-btn'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap components
    const navbar = document.querySelector('.navbar');
    const navbarBrand = navbar?.querySelector('.navbar-brand');
    const navbarToggler = navbar?.querySelector('.navbar-toggler');
    const navbarCollapse = navbar?.querySelector('.navbar-collapse');
    const body = document.body;
    
    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.substring(1);
            
            if (!targetId) return;
            
            // Close mobile menu if open
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            
            // Scroll to section
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event listener untuk perubahan state collapse
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('nav-open');
        });

        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            document.body.classList.remove('nav-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse && 
                navbarCollapse.classList.contains('show') && 
                !navbarCollapse.contains(e.target) && 
                !navbarToggler?.contains(e.target)) {
                bsCollapse.hide();
            }
        });
    }

    // Navbar shrink behavior
    const navbarShrink = () => {
        if (!navbar) return;
        
        if (window.innerWidth >= 992) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        } else {
            navbar.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
    navbarShrink();

    // Hide all sections except home initially
    const sections = document.querySelectorAll(`.${CLASSES.sections.page}`);
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        }
    });

    // Show masthead initially
    const masthead = document.querySelector('.masthead');
    if (masthead) {
        masthead.style.display = 'block';
        setTimeout(() => {
            masthead.classList.add(CLASSES.sections.active);
        }, 10);
    }

    // Handle navigation with responsive behavior
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Hide all sections and masthead
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove(CLASSES.sections.active);
            });
            if (masthead) {
                masthead.style.display = 'none';
                masthead.classList.remove(CLASSES.sections.active);
            }
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                setTimeout(() => {
                    targetSection.classList.add(CLASSES.sections.active);
                }, 10);
            }

            // Close mobile menu if open (only on mobile)
            if (!mediaQueries.lg.matches) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });

    // Brand text responsive behavior
    const updateBrandText = () => {
        if (!navbarBrand) return;

        const brandTextSmall = navbarBrand.querySelector(`.${CLASSES.brand.small}`);
        const brandTextLarge = navbarBrand.querySelector(`.${CLASSES.brand.large}`);
        
        if (brandTextSmall && brandTextLarge) {
            if (mediaQueries.md.matches) {
                brandTextSmall.style.display = 'none';
                brandTextLarge.style.display = 'inline-block';
            } else {
                brandTextSmall.style.display = 'block';
                brandTextLarge.style.display = 'none';
            }
        }
    };

    // Footer social media links
    const setupSocialLinks = () => {
        const socialLinks = document.querySelectorAll('.social-icons .social-link');
        socialLinks.forEach(link => {
            // Add hover effects
            const icon = link.querySelector('i');
            const hoverText = link.querySelector('.social-hover');
            
            link.addEventListener('mouseenter', () => {
                if (icon) icon.classList.add('fa-bounce');
                if (hoverText) hoverText.classList.add('show');
                
                // Add platform-specific hover effects
                if (link.classList.contains('social-facebook')) {
                    link.classList.add('hover-facebook');
                } else if (link.classList.contains('social-instagram')) {
                    link.classList.add('hover-instagram');
                } else if (link.classList.contains('social-tiktok')) {
                    link.classList.add('hover-tiktok');
                } else if (link.classList.contains('social-youtube')) {
                    link.classList.add('hover-youtube');
                }
            });

            link.addEventListener('mouseleave', () => {
                if (icon) icon.classList.remove('fa-bounce');
                if (hoverText) hoverText.classList.remove('show');
                
                link.classList.remove(
                    'hover-facebook',
                    'hover-instagram',
                    'hover-tiktok',
                    'hover-youtube'
                );
            });

            // Add touch event handling for mobile
            link.addEventListener('touchstart', function(e) {
                if (!mediaQueries.lg.matches) {
                    e.preventDefault();
                    const wasActive = this.classList.contains('active');
                    
                    socialLinks.forEach(otherLink => {
                        otherLink.classList.remove('active');
                        const otherHoverText = otherLink.querySelector('.social-hover');
                        if (otherHoverText) otherHoverText.classList.remove('show');
                    });

                    if (!wasActive) {
                        this.classList.add('active');
                        if (hoverText) hoverText.classList.add('show');
                    } else {
                        window.location.href = this.href;
                    }
                }
            });
        });

        // Close active social link when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.social-link')) {
                socialLinks.forEach(link => {
                    link.classList.remove('active');
                    const hoverText = link.querySelector('.social-hover');
                    if (hoverText) hoverText.classList.remove('show');
                });
            }
        });
    };

    // Footer links
    const setupFooterLinks = () => {
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.classList.add(CLASSES.footer.link);
        });
    };

// Cookie Consent Handler
const cookieConsent = document.getElementById('cookieConsent');
const acceptBtn = document.getElementById('acceptCookies');
const rejectBtn = document.getElementById('rejectCookies');

// Check if user has already made a choice
const cookieChoice = localStorage.getItem('cookieConsent');

// Hanya tampilkan cookie consent jika user belum membuat pilihan
if (!cookieChoice && cookieConsent) {
    setTimeout(() => {
        cookieConsent.style.display = 'block';
    }, 2000);
} else {
    // Jika sudah ada pilihan, sembunyikan banner
    if (cookieConsent) {
        cookieConsent.style.display = 'none';
    }
    
    // Aktifkan cookie jika sebelumnya user menerima
    if (cookieChoice === 'accepted') {
        enableCookies();
    }
}

// Handle Accept button click
if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        if (cookieConsent) {
            cookieConsent.style.opacity = '0';
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 300);
        }
        enableCookies();
    });
}

// Handle Reject button click
if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        if (cookieConsent) {
            cookieConsent.style.opacity = '0';
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 300);
        }
        disableCookies();
    });
}

    // Handle responsive images
    const handleResponsiveImages = () => {
        const images = document.querySelectorAll('.lazy-load[data-src]');
        images.forEach(img => {
            const mobileSrc = img.getAttribute('data-mobile-src');
            const desktopSrc = img.getAttribute('data-src');
            
            if (mobileSrc && !mediaQueries.md.matches) {
                img.src = mobileSrc;
            } else if (desktopSrc) {
                img.src = desktopSrc;
            }

            if (img.closest('.portfolio-item')) {
                img.classList.add('portfolio-icon');
            } else if (img.closest('.kyai-member')) {
                img.classList.add('kyai-img');
            } else if (img.closest('.fasilitas-content')) {
                img.classList.add('fasilitas-img');
            }
        });
    };

    // Handle responsive videos
    const handleResponsiveVideos = () => {
        const videos = document.querySelectorAll('lite-youtube');
        videos.forEach(video => {
            const quality = mediaQueries.md.matches ? 'hqdefault' : 'mqdefault';
            video.setAttribute('poster', quality);
            video.closest('.video-container')?.classList.add('shadow', 'rounded');
        });
    };

    // Initialize components
    updateBrandText();
    setupSocialLinks();
    setupFooterLinks();
    handleResponsiveImages();
    handleResponsiveVideos();

    // Event listeners
    window.addEventListener('resize', updateBrandText);
    mediaQueries.md.addEventListener('change', handleResponsiveImages);
    mediaQueries.md.addEventListener('change', handleResponsiveVideos);

    // ScrollSpy initialization
    if (navbar) {
        const updateScrollSpyOffset = () => {
            const offset = mediaQueries.lg.matches ? '40%' : '25%';
            new bootstrap.ScrollSpy(document.body, {
                target: '.navbar',
                rootMargin: `0px 0px -${offset}`
            });
        };

        updateScrollSpyOffset();
        mediaQueries.lg.addEventListener('change', updateScrollSpyOffset);
    }

    // Initialize components
    sejarahSection.init();
    lazyLoad.init();
});