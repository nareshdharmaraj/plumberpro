// Page Load Animation
window.addEventListener('load', function () {
    document.body.classList.remove('page-loading');
    document.body.classList.add('loaded');

    // Hide loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    }

    // Initialize all animations after page load
    initPageLoadAnimations();
    initScrollAnimations();
    initHoverAnimations();
    initAnimeAnimations();
    initParallax();
    initProgressBar();
    initCounterAnimations();
    initTextReveal();
});

// Page Exit Animation
document.addEventListener('DOMContentLoaded', function () {
    // Add page loading class initially
    document.body.classList.add('page-loading');

    // Handle page exits
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hostname === window.location.hostname || !this.hostname) {
                document.body.classList.add('page-exiting');
            }
        });
    });
});

// Page Load Animations
function initPageLoadAnimations() {
    // Animate navbar on load
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.animation = 'fadeInDown 0.8s ease forwards';
    }

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease 0.3s forwards';
        heroContent.style.opacity = '0';
    }

    // Stagger card animations
    const cards = document.querySelectorAll('.card, .stats-card, .operations-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.animation = `fadeInUp 0.8s ease ${0.5 + (index * 0.1)}s forwards`;
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    // Create animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 0.1;

                // Add appropriate animation class based on element position
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
                } else if (entry.target.classList.contains('fade-in-left')) {
                    entry.target.style.animation = `fadeInLeft 0.8s ease ${delay}s forwards`;
                } else if (entry.target.classList.contains('fade-in-right')) {
                    entry.target.style.animation = `fadeInRight 0.8s ease ${delay}s forwards`;
                } else if (entry.target.classList.contains('fade-in-scale')) {
                    entry.target.style.animation = `fadeInScale 0.8s ease ${delay}s forwards`;
                } else {
                    // Default fade in up
                    entry.target.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
                }

                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    const animateElements = document.querySelectorAll(`
        .card, .stats-card, .section-header, .operations-card, 
        .metric-card, .phase-card, .dashboard-card,
        .hero-content, .process-step, .home2-feature-card
    `);

    animateElements.forEach((el, index) => {
        // Add default animation class if none exists
        if (!el.classList.contains('fade-in-up') &&
            !el.classList.contains('fade-in-left') &&
            !el.classList.contains('fade-in-right') &&
            !el.classList.contains('fade-in-scale')) {
            el.classList.add('fade-in-up');
        }

        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });
}

// Enhanced Hover Animations
function initHoverAnimations() {
    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('hover-lift');
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.transition = 'all 0.2s ease';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });

        // Click ripple effect
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Navbar link hover effects
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
            this.style.color = 'var(--primary)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });

    // Icon hover animations
    document.querySelectorAll('.card-icon i, .card-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Enhanced Custom Animations (No external library dependency)
function initAnimeAnimations() {
    // Use custom animations instead of anime.js
    initBasicCounterAnimations();

    // Gradient text animation (custom)
    document.querySelectorAll('.gradient-text').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.9)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }, index * 150);
    });

    // Stats number counter animation
    document.querySelectorAll('.stats-number').forEach((el, index) => {
        const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
        const suffix = el.textContent.replace(/\d/g, '');

        anime({
            targets: { value: 0 },
            value: target,
            duration: 2000,
            easing: 'easeOutExpo',
            delay: 500 + (index * 200),
            update: function (anim) {
                el.textContent = Math.floor(anim.animatables[0].target.value) + suffix;
            }
        });
    });

    // Animated background shapes (custom animation)
    const shapes = document.querySelectorAll('.animated-bg .shape');
    shapes.forEach((shape, index) => {
        const randomY = -30 + Math.random() * 60;
        const randomX = -30 + Math.random() * 60;
        const randomScale = 0.8 + Math.random() * 0.4;
        const randomRotate = -15 + Math.random() * 30;

        shape.style.animation = `floatShape 4s ease-in-out infinite`;
        shape.style.animationDelay = `${index * 0.8}s`;
        shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`;

        // Add CSS animation if not exists
        if (!document.getElementById('floatShapeAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatShapeAnimation';
            style.textContent = `
                @keyframes floatShape {
                    0%, 100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    50% {
                        transform: translate(30px, -30px) scale(1.1) rotate(15deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });

    // Metric cards animation on scroll
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        }, { threshold: 0.5 });

        metricCards.forEach(card => observer.observe(card));
    }
}

// Basic counter animation if anime.js is not available
function initBasicCounterAnimations() {
    document.querySelectorAll('.stats-number').forEach(el => {
        const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
        const suffix = el.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    });
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const hero = document.querySelector('.hero, .home2-hero');
        if (hero) {
            const speed = 0.3;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }

        // Animated background parallax
        const animatedBg = document.querySelectorAll('.animated-bg .shape');
        animatedBg.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax elements
        document.querySelectorAll('.parallax-element').forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = el.dataset.speed || 0.5;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top / speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Progress Bar (Reading Progress)
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter, .metric-value, .stats-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
                const suffix = text.replace(/[0-9.]/g, '');

                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Text Reveal Animation
function initTextReveal() {
    const textReveals = document.querySelectorAll('.text-reveal');

    textReveals.forEach(reveal => {
        const text = reveal.textContent;
        const words = text.split(' ');
        reveal.innerHTML = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 0.1}s`;
            reveal.appendChild(span);
        });
    });
}

// Image Lazy Loading with Animation
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
}

// Initialize image loading
initImageLoading();

// Advanced Floating Animations
function initFloatingAnimations() {
    // Floating animation for cards and icons
    const floatingElements = document.querySelectorAll('.card, .stats-card, .card-icon, .quote-icon-badge, .testimonial-avatar');

    floatingElements.forEach((el, index) => {
        const delay = index * 0.1;
        const duration = 3 + Math.random() * 2; // Random duration between 3-5s
        const amplitude = 10 + Math.random() * 10; // Random amplitude between 10-20px

        // Apply floating effect
        el.style.position = 'relative';
        el.style.animation = `floatUpDown ${duration}s ease-in-out infinite`;
        el.style.animationDelay = `${delay}s`;

        // Add CSS for floating animation if not exists
        if (!document.getElementById('floatingAnimations')) {
            const style = document.createElement('style');
            style.id = 'floatingAnimations';
            style.textContent = `
                @keyframes floatUpDown {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-${amplitude}px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });

    // Advanced hover floating for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.animation = 'hoverFloat 0.6s ease-in-out infinite alternate';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.animation = '';
            this.style.transform = '';
        });
    });

    // Add hover float animation
    if (!document.getElementById('hoverFloatAnimation')) {
        const style = document.createElement('style');
        style.id = 'hoverFloatAnimation';
        style.textContent = `
            @keyframes hoverFloat {
                from {
                    transform: translateY(0px) scale(1);
                }
                to {
                    transform: translateY(-5px) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Stagger Animation for Testimonials
function initTestimonialAnimations() {
    const testimonials = document.querySelectorAll('.testimonial-card');

    testimonials.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(10deg)';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    });

    // Quote icon animation
    document.querySelectorAll('.quote-icon-badge').forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.animation = 'iconBounce 0.6s ease-in-out';
        });

        icon.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });

    // Add icon bounce animation
    if (!document.getElementById('iconBounceAnimation')) {
        const style = document.createElement('style');
        style.id = 'iconBounceAnimation';
        style.textContent = `
            @keyframes iconBounce {
                0%, 100% {
                    transform: scale(1) rotate(0deg);
                }
                25% {
                    transform: scale(1.2) rotate(-10deg);
                }
                75% {
                    transform: scale(1.2) rotate(10deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3D Card Flip Animation
function init3DCardAnimations() {
    const cards3D = document.querySelectorAll('.card, .operations-card');

    cards3D.forEach(card => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
    });
}

// Pulse Animation for Stats
function initPulseAnimations() {
    const statsNumbers = document.querySelectorAll('.stats-number, .metric-value');

    statsNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'numberPulse 1s ease-in-out';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 1000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });

    // Add number pulse animation
    if (!document.getElementById('numberPulseAnimation')) {
        const style = document.createElement('style');
        style.id = 'numberPulseAnimation';
        style.textContent = `
            @keyframes numberPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                    color: var(--primary);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Wave Animation
function initWaveAnimations() {
    const sections = document.querySelectorAll('.section-header');

    sections.forEach(header => {
        const title = header.querySelector('.section-title');
        if (title) {
            const words = title.textContent.split(' ');
            title.innerHTML = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.display = 'inline';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.animation = `waveIn 0.6s ease forwards`;
                span.style.animationDelay = `${index * 0.1}s`;
                title.appendChild(span);
            });
        }
    });

    // Add wave animation
    if (!document.getElementById('waveAnimation')) {
        const style = document.createElement('style');
        style.id = 'waveAnimation';
        style.textContent = `
            @keyframes waveIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all advanced animations
window.addEventListener('load', function () {
    initFloatingAnimations();
    initTestimonialAnimations();
    init3DCardAnimations();
    initPulseAnimations();
    initWaveAnimations();
});
