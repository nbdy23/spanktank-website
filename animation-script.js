(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    const heroSection = document.getElementById('hero');
    const scrollTextSection = document.getElementById('scrollText');
    const scrollWords = document.querySelectorAll('.scroll-word');
    
    const videoSection = document.getElementById('videoSection');
    const featuredVideo = document.getElementById('featuredVideo');
    const muteBtn = document.getElementById('muteBtn');
    
    const bentoCarousel = document.getElementById('bentoCarousel');
    const bentoTrack = bentoCarousel?.querySelector('.bento-track');
    const bentoPrev = document.getElementById('bentoPrev');
    const bentoNext = document.getElementById('bentoNext');

    // ============================================
    // STATE
    // ============================================
    let isMenuOpen = false;
    let isVideoPlaying = false;
    let isMuted = true;
    let carouselPosition = 0;
    let lastScrollY = 0;
    let ticking = false;

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * Debounce function for performance
     */
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

    /**
     * Throttle function using RAF
     */
    function throttleRAF(callback) {
        return function() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    callback();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    /**
     * Get element's position relative to viewport
     */
    function getElementProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate how far through the viewport the element has scrolled
        const start = windowHeight;
        const end = -elementHeight;
        const current = rect.top;
        
        return 1 - (current - end) / (start - end);
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * (1 - threshold)) &&
            rect.bottom >= (window.innerHeight * threshold)
        );
    }

    // ============================================
    // NAVIGATION
    // ============================================
    
    /**
     * Handle scroll effects on navigation
     */
    function handleNavScroll() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for background
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
    }

    /**
     * Toggle mobile menu
     */
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        nav.classList.toggle('menu-open', isMenuOpen);
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    /**
     * Close menu
     */
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            nav.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // SCROLL TEXT ANIMATION (Terminal Industries Style)
    // ============================================
    
    /**
     * Animate scroll text words based on scroll position
     */
    function animateScrollText() {
        if (!scrollTextSection) return;
        
        const sectionRect = scrollTextSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate section progress (0 to 1)
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Start animation when section enters viewport
        const triggerPoint = windowHeight * 0.8;
        const progress = Math.max(0, Math.min(1, (triggerPoint - sectionTop) / (sectionHeight * 0.6)));
        
        scrollWords.forEach((word, index) => {
            const wordDelay = index * 0.15;
            const wordProgress = Math.max(0, Math.min(1, (progress - wordDelay) * 3));
            
            if (wordProgress > 0.1) {
                word.classList.add('visible');
            } else {
                word.classList.remove('visible');
            }
        });
    }

    // ============================================
    // VIDEO CONTROLS
    // ============================================
    
    /**
     * Initialize video
     */
    function initVideo() {
        if (!featuredVideo) return;
        
        // Start muted for autoplay compliance
        featuredVideo.muted = true;
        isMuted = true;
        
        // Attempt to play
        const playPromise = featuredVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isVideoPlaying = true;
            }).catch((error) => {
                console.log('Video autoplay prevented:', error);
                isVideoPlaying = false;
            });
        }
    }

    /**
     * Toggle video mute
     */
    function toggleMute() {
        if (!featuredVideo) return;
        
        isMuted = !isMuted;
        featuredVideo.muted = isMuted;
        muteBtn.classList.toggle('unmuted', !isMuted);
    }

    /**
     * Handle video scroll - pause/play based on visibility
     */
    function handleVideoScroll() {
        if (!featuredVideo || !videoSection) return;
        
        const isVisible = isInViewport(videoSection, 0.3);
        
        if (isVisible && !isVideoPlaying) {
            featuredVideo.play().then(() => {
                isVideoPlaying = true;
            }).catch(() => {});
        } else if (!isVisible && isVideoPlaying) {
            featuredVideo.pause();
            isVideoPlaying = false;
        }
    }

    // ============================================
    // BENTO CAROUSEL
    // ============================================
    
    /**
     * Initialize carousel
     */
    function initCarousel() {
        if (!bentoCarousel || !bentoTrack) return;
        
        // For desktop, carousel scrolls horizontally if needed
        // For mobile, it's a vertical stack
        updateCarouselNav();
    }

    /**
     * Update carousel navigation visibility
     */
    function updateCarouselNav() {
        if (!bentoTrack || !bentoPrev || !bentoNext) return;
        
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Hide nav on mobile (vertical stack)
            bentoPrev.style.display = 'none';
            bentoNext.style.display = 'none';
        } else {
            bentoPrev.style.display = 'flex';
            bentoNext.style.display = 'flex';
        }
    }

    /**
     * Scroll carousel
     */
    function scrollCarousel(direction) {
        if (!bentoTrack) return;
        
        const cardWidth = bentoTrack.querySelector('.bento-card')?.offsetWidth || 300;
        const gap = 32; // var(--space-md)
        const scrollAmount = cardWidth + gap;
        
        const currentScroll = bentoTrack.scrollLeft;
        const maxScroll = bentoTrack.scrollWidth - bentoTrack.offsetWidth;
        
        let newScroll;
        if (direction === 'next') {
            newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
        } else {
            newScroll = Math.max(currentScroll - scrollAmount, 0);
        }
        
        bentoTrack.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // ============================================
    
    /**
     * Initialize reveal animations
     */
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.bento-card, .media-card, .blog-card, .section-header'
        );
        
        // Add reveal class and stagger index
        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.setProperty('--stagger', index % 6);
        });
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay for mobile scroll performance
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================
    // MAIN SCROLL HANDLER
    // ============================================
    
    function onScroll() {
        handleNavScroll();
        animateScrollText();
        handleVideoScroll();
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    function initEventListeners() {
        // Scroll events (throttled)
        window.addEventListener('scroll', throttleRAF(onScroll), { passive: true });
        
        // Resize events (debounced)
        window.addEventListener('resize', debounce(() => {
            updateCarouselNav();
        }, 150));
        
        // Menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
        
        // Close menu on link click
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Video mute toggle
        if (muteBtn) {
            muteBtn.addEventListener('click', toggleMute);
        }
        
        // Carousel navigation
        if (bentoPrev) {
            bentoPrev.addEventListener('click', () => scrollCarousel('prev'));
        }
        if (bentoNext) {
            bentoNext.addEventListener('click', () => scrollCarousel('next'));
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    function init() {
        // Remove loading state
        document.body.classList.remove('loading');
        
        // Initialize components
        initEventListeners();
        initVideo();
        initCarousel();
        initRevealAnimations();
        
        // Run scroll handler once to set initial states
        onScroll();
        
        console.log('Spencer Kenyon website initialized');
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                closeMenu();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PRELOAD CRITICAL IMAGES
    // ============================================
    
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }

    // Preload hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && heroImage.src) {
        preloadImage(heroImage.src);
    }

})();