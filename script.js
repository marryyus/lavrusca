// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

if (hamburger && navMobile) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        navMobile.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMobile.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');
const scrollTop = document.querySelector('.scroll-top');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });

    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Testimonial slider
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const navButtons = document.querySelectorAll('.testimonial-nav button');
let currentTestimonialIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showTestimonial(index) {
    if (index < 0) {
        index = testimonials.length - 1;
    } else if (index >= testimonials.length) {
        index = 0;
    }
    
    currentTestimonialIndex = index;
    testimonialSlider.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    
    // Update active buttons
    navButtons.forEach((button, i) => {
        if (i === currentTestimonialIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

if (testimonialSlider && testimonials.length > 0) {
    // Event listeners for navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Touch swipe support for testimonials
    testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
    }, { passive: true });

    function handleTestimonialSwipe() {
        if (touchEndX < touchStartX - 50) {
            showTestimonial(currentTestimonialIndex + 1);
        } else if (touchEndX > touchStartX + 50) {
            showTestimonial(currentTestimonialIndex - 1);
        }
    }

    // Auto-play for testimonials
    let autoplayInterval = setInterval(() => {
        showTestimonial(currentTestimonialIndex + 1);
    }, 5000);

    // Pause auto-play on interaction
    testimonialSlider.addEventListener('touchstart', () => {
        clearInterval(autoplayInterval);
    }, { passive: true });

    // Resume auto-play after interaction
    testimonialSlider.addEventListener('touchend', () => {
        autoplayInterval = setInterval(() => {
            showTestimonial(currentTestimonialIndex + 1);
        }, 5000);
    }, { passive: true });
}

// Gallery slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (!slider || !slides || !prevBtn || !nextBtn) {
        console.warn('Gallery slider elements not found');
        return;
    }

    const totalSlides = slides.children.length;
    let slideIndex = 0;

    function updateSlider() {
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateSlider();
    });

    // Auto-play slider
    let galleryAutoplayInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // Pause auto-play on hover
    slider.addEventListener('mouseenter', () => clearInterval(galleryAutoplayInterval));
    slider.addEventListener('mouseleave', () => {
        galleryAutoplayInterval = setInterval(() => {
            slideIndex = (slideIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });

    // Touch swipe support for gallery
    let galleryTouchStartX = 0;
    let galleryTouchEndX = 0;

    slides.addEventListener('touchstart', e => {
        galleryTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slides.addEventListener('touchend', e => {
        galleryTouchEndX = e.changedTouches[0].screenX;
        if (galleryTouchEndX < galleryTouchStartX - 50) {
            slideIndex = (slideIndex + 1) % totalSlides;
            updateSlider();
        } else if (galleryTouchEndX > galleryTouchStartX + 50) {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
    }, { passive: true });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mulțumim pentru mesaj! Vă vom contacta în curând.');
        this.reset();
    });
}