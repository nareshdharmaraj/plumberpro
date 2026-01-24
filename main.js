// Create page loader
const loader = document.createElement('div');
loader.className = 'loader';
loader.innerHTML = '<div class="loader-spinner"></div>';
document.body.appendChild(loader);

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initDropdowns();
  initThemeToggle();
  initAnimations();
  initSmoothScroll();
});

window.addEventListener('load', function () {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
});

function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', function () {
      navbarMenu.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
}

function initDropdowns() {
  const dropdownItems = document.querySelectorAll('.navbar-item.has-dropdown');

  if (window.innerWidth <= 768) {
    dropdownItems.forEach(item => {
      const link = item.querySelector('.navbar-link');
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    });
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle i');
  if (themeToggle) {
    themeToggle.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.card, .stats-card, .dashboard-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: ${type === 'success' ? '#22c55e' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    const navbarMenu = document.querySelector('.navbar-menu');
    if (navbarMenu) {
      navbarMenu.classList.remove('active');
    }
  }
});
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
// Advanced Animations inspired by animejs.com
// Particle effects, morphing shapes, advanced transforms

document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initMorphingShapes();
    initAdvancedTransforms();
    initScrollReveal();
    initParallaxLayers();
    initFloatingElements();
});

// Particle Background Animation
function initParticleBackground() {
    const containers = document.querySelectorAll('.animated-bg, body');
    
    containers.forEach(container => {
        if (container.querySelector('.particle-container')) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        
        container.style.position = 'relative';
        container.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, 
                    rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2}), 
                    rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2}));
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: floatParticle ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 2}px rgba(255, 107, 53, 0.5);
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add CSS animation
        if (!document.getElementById('particleAnimation')) {
            const style = document.createElement('style');
            style.id = 'particleAnimation';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
                        opacity: 0.5;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// Morphing Shapes Animation
function initMorphingShapes() {
    const shapes = document.querySelectorAll('.morph-shape');
    
    shapes.forEach(shape => {
        const morphValues = [
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            'circle(50% at 50% 50%)'
        ];
        
        let currentIndex = 0;
        shape.style.clipPath = morphValues[0];
        shape.style.transition = 'clip-path 2s ease-in-out';
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % morphValues.length;
            shape.style.clipPath = morphValues[currentIndex];
        }, 3000);
    });
}

// Advanced Transform Animations
function initAdvancedTransforms() {
    const elements = document.querySelectorAll('.advanced-transform');
    
    elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const transforms = [
                { rotate: '15deg', scale: 1.1, skew: '5deg' },
                { rotate: '-15deg', scale: 1.15, skew: '-5deg' },
                { rotate: '0deg', scale: 1.2, skew: '0deg' }
            ];
            
            let index = 0;
            const animate = () => {
                if (index < transforms.length) {
                    const t = transforms[index];
                    this.style.transform = `rotate(${t.rotate}) scale(${t.scale}) skew(${t.skew})`;
                    this.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    index++;
                    setTimeout(animate, 200);
                }
            };
            animate();
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1) skew(0deg)';
        });
    });
}

// Advanced Scroll Reveal
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                    element.style.filter = 'blur(0px)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9) rotate(5deg)';
        el.style.filter = 'blur(10px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// Parallax Layers
function initParallaxLayers() {
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Floating Elements with Physics
function initFloatingElements() {
    const floaters = document.querySelectorAll('.float-physics');
    
    floaters.forEach((floater, index) => {
        let x = 0;
        let y = 0;
        let vx = (Math.random() - 0.5) * 0.5;
        let vy = (Math.random() - 0.5) * 0.5;
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;
        
        const animate = () => {
            x += vx;
            y += vy;
            
            // Bounce off edges
            if (x <= 0 || x >= maxX - floater.offsetWidth) vx *= -1;
            if (y <= 0 || y >= maxY - floater.offsetHeight) vy *= -1;
            
            floater.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
            requestAnimationFrame(animate);
        };
        
        animate();
    });
}

// Stagger Animation Utility
function staggerAnimation(elements, animationFn, delay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            animationFn(el, index);
        }, index * delay);
    });
}

// Spring Animation
function springAnimation(element, target, options = {}) {
    const {
        stiffness = 100,
        damping = 10,
        mass = 1
    } = options;
    
    let position = 0;
    let velocity = 0;
    const targetValue = target;
    
    const animate = () => {
        const force = (targetValue - position) * stiffness;
        const dampingForce = velocity * damping;
        const acceleration = (force - dampingForce) / mass;
        
        velocity += acceleration * 0.016; // ~60fps
        position += velocity * 0.016;
        
        element.style.transform = `translateY(${position}px)`;
        
        if (Math.abs(targetValue - position) > 0.1 || Math.abs(velocity) > 0.1) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Morphing Gradient Background
function initMorphingGradient() {
    const gradients = document.querySelectorAll('.morph-gradient');
    
    gradients.forEach(gradient => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            gradient.style.background = `
                linear-gradient(
                    ${hue}deg,
                    hsl(${hue}, 70%, 60%),
                    hsl(${(hue + 60) % 360}, 70%, 50%),
                    hsl(${(hue + 120) % 360}, 70%, 60%)
                )
            `;
        }, 50);
    });
}

// Initialize morphing gradients
document.addEventListener('DOMContentLoaded', initMorphingGradient);
class HeroAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null };

        this.init();
    }

    init() {
        this.canvas.id = 'hero-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1'; // Behind everything
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.5'; // Subtle effect

        document.body.prepend(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.trackMouse(e, document.body));
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }

    trackMouse(e, container) {
        const rect = container.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    createParticles() {
        this.particles = [];
        // More particles for a denser, richer look
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 107, 53, 0.6)', // Primary
            'rgba(99, 102, 241, 0.6)', // Secondary
            'rgba(34, 197, 94, 0.6)',  // Success
            'rgba(255, 182, 39, 0.6)'  // Accent
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, index) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse interaction
            if (this.mouse.x) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (200 - distance) / 200;
                    p.vx -= Math.cos(angle) * force * 0.1;
                    p.vy -= Math.sin(angle) * force * 0.1;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(150, 150, 150, ${1 - dist / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimation();
});
// Interactive Charts Library (No external dependencies)
class Chart {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.canvas.chart = this;

        this.ctx = this.canvas.getContext('2d');
        this.options = {
            type: options.type || 'line',
            data: options.data || [],
            dataSecondary: options.dataSecondary || [], // For Gantt/Stacked
            labels: options.labels || [],
            colors: options.colors || ['#FF6B35', '#6366f1', '#22c55e', '#f59e0b'],
            responsive: true,
            ...options
        };

        this.tooltip = document.getElementById('chart-tooltip');
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.id = 'chart-tooltip';
            this.tooltip.style.cssText = `
                position: absolute;
                background: rgba(15, 23, 42, 0.95);
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: 0.5rem;
                font-family: inherit;
                font-size: 0.875rem;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s, top 0.1s, left 0.1s;
                z-index: 1000;
                transform: translate(-50%, -120%);
                white-space: nowrap;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(4px);
            `;
            document.body.appendChild(this.tooltip);
        }

        this.init();
    }

    init() {
        // Add animation properties
        this.progress = 0;
        this.animationSpeed = this.options.animationSpeed || 0.05;
        this.isAnimating = true;
        this.rafId = null;

        this.resize();
        this.resize();

        // Use ResizeObserver for robust responsiveness
        this.resizeObserver = new ResizeObserver(() => {
            this.resize();
            if (!this.isAnimating) {
                this.draw();
            }
        });
        this.resizeObserver.observe(this.canvas);

        // Start animation
        this.animate();

        // Interactive events
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.hideTooltip());
    }

    animate() {
        if (this.progress < 1) {
            this.progress += this.animationSpeed;
            if (this.progress > 1) this.progress = 1;
            this.draw();
            this.rafId = requestAnimationFrame(() => this.animate());
        } else {
            this.isAnimating = false;
            this.draw();
        }
    }

    handleMouseMove(e) {
        if (this.isAnimating) return; // Disable hover during animation
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const { data, labels } = this.options;

        let activeIndex = -1;

        if (this.options.type === 'pie') {
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = Math.min(width, height) / 2 - 20;

            if (distance <= radius) {
                let angle = Math.atan2(dy, dx); // -PI to PI
                if (angle < -Math.PI / 2) angle += Math.PI * 2; // Normalize start to -PI/2

                // Adjust for the -PI/2 start angle of the chart
                let checkAngle = angle + Math.PI / 2;
                if (checkAngle < 0) checkAngle += Math.PI * 2;

                const total = data.reduce((a, b) => a + b, 0);
                let currentAngle = 0;

                for (let i = 0; i < data.length; i++) {
                    const sliceAngle = (data[i] / total) * Math.PI * 2;
                    if (checkAngle >= currentAngle && checkAngle < currentAngle + sliceAngle + 0.01) { // 0.01 buffer
                        activeIndex = i;
                        break;
                    }
                    currentAngle += sliceAngle;
                }
            }
        } else {
            // Bar, Line, Area logic
            // Each data point occupies a segment of width
            const segmentWidth = this.options.type === 'bar'
                ? chartWidth / data.length
                : chartWidth / (data.length - 1);

            // X relative to chart area
            const chartX = x - padding;

            if (chartX >= -10 && chartX <= chartWidth + 10) {
                if (this.options.type === 'bar') {
                    activeIndex = Math.floor(chartX / segmentWidth);
                } else {
                    activeIndex = Math.round(chartX / segmentWidth);
                }
            }
        }

        if (activeIndex >= 0 && activeIndex < data.length) {
            let color;
            if (this.options.type === 'pie' || this.options.type === 'bar') {
                color = this.options.colors[activeIndex % this.options.colors.length];
            } else {
                color = this.options.colors[0];
            }
            // Use pageX/Y to account for scroll position
            this.showTooltip(e.pageX, e.pageY - 10, labels[activeIndex], data[activeIndex], color);
        } else {
            this.hideTooltip();
        }
    }

    showTooltip(x, y, label, value, color) {
        this.tooltip.innerHTML = `
            <div style="margin-bottom: 2px; font-size: 11px; opacity: 0.7;">${label}</div>
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px;">
                <span style="display: block; width: 10px; height: 10px; background: ${color}; border-radius: 2px;"></span>
                ${value}
            </div>
        `;
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
        this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    draw() {
        const { width, height } = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);

        switch (this.options.type) {
            case 'line':
                this.drawLineChart(width, height);
                break;
            case 'bar':
                this.drawBarChart(width, height);
                break;
            case 'pie':
                this.drawPieChart(width, height);
                break;
            case 'area':
                this.drawAreaChart(width, height);
                break;
            case 'gantt':
                this.drawGanttChart(width, height);
                break;
        }
    }

    getTextColor() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? '#f1f5f9' : '#334155';
    }

    drawLineChart(width, height) {
        const { data, labels, colors } = this.options;
        const isSmallScreen = width < 400;
        const padding = isSmallScreen ? 20 : 40;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxValue = Math.max(...data, 1);
        const textColor = this.getTextColor();

        // Grid
        const gridOpacity = this.progress; // Fade in grid
        this.ctx.globalAlpha = gridOpacity;
        this.ctx.strokeStyle = this.getTextColor() === '#f1f5f9' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
        this.ctx.lineWidth = 2;

        const gridLines = isSmallScreen ? 3 : 5;
        // Don't draw the very bottom line to avoid text overlap
        for (let i = 0; i < gridLines; i++) {
            const y = padding + (chartHeight / gridLines) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;

        // Line
        this.ctx.strokeStyle = colors[0];
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        // Draw line with animation progress
        const pointsToDraw = Math.floor((data.length - 1) * this.progress);
        const partialProgress = ((data.length - 1) * this.progress) - pointsToDraw;

        data.forEach((value, index) => {
            if (index > pointsToDraw + 1) return;

            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else if (index <= pointsToDraw) {
                this.ctx.lineTo(x, y);
            } else if (index === pointsToDraw + 1) {
                // Interpolate last segment
                const prevX = padding + (chartWidth / (data.length - 1)) * (index - 1);
                const prevY = padding + chartHeight - (data[index - 1] / maxValue) * chartHeight;
                const currX = x;
                const currY = y;
                this.ctx.lineTo(
                    prevX + (currX - prevX) * partialProgress,
                    prevY + (currY - prevY) * partialProgress
                );
            }
        });

        this.ctx.stroke();

        // Points (fade in)
        if (this.progress > 0.5) {
            this.ctx.globalAlpha = (this.progress - 0.5) * 2;
            data.forEach((value, index) => {
                if (index > pointsToDraw) return;

                const x = padding + (chartWidth / (data.length - 1)) * index;
                const y = padding + chartHeight - (value / maxValue) * chartHeight;

                this.ctx.fillStyle = colors[0];
                this.ctx.beginPath();
                this.ctx.arc(x, y, 5, 0, Math.PI * 2);
                this.ctx.fill();

                // Labels
                this.ctx.fillStyle = textColor;
                this.ctx.font = '12px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(labels[index] || '', x, height - 5);
            });
            this.ctx.globalAlpha = 1;
        }
    }

    drawBarChart(width, height) {
        const { data, labels, colors } = this.options;
        const isSmallScreen = width < 400;
        const padding = isSmallScreen ? 20 : 40;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxValue = Math.max(...data, 1);
        const barWidth = (chartWidth / data.length) - (isSmallScreen ? 4 : 10);
        const textColor = this.getTextColor();

        data.forEach((value, index) => {
            const x = padding + (chartWidth / data.length) * index + (isSmallScreen ? 2 : 5);
            // Animate height
            const targetHeight = (value / maxValue) * chartHeight;
            const barHeight = targetHeight * this.progress;

            const y = padding + chartHeight - barHeight;

            // Gradient
            const gradient = this.ctx.createLinearGradient(x, padding + chartHeight - targetHeight, x, padding + chartHeight);
            gradient.addColorStop(0, colors[index % colors.length]);
            gradient.addColorStop(1, this.darkenColor(colors[index % colors.length], 0.3));

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, barWidth, barHeight);

            // Value label (fade in at end)
            if (this.progress > 0.8) {
                this.ctx.globalAlpha = (this.progress - 0.8) * 5;
                this.ctx.fillStyle = textColor;
                this.ctx.font = 'bold 12px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(value, x + barWidth / 2, y - 5);

                // X-axis label
                this.ctx.fillStyle = textColor;
                this.ctx.font = '11px sans-serif';
                this.ctx.fillText(labels[index] || '', x + barWidth / 2, height - 10);
                this.ctx.globalAlpha = 1;
            }
        });
    }

    drawPieChart(width, height) {
        const { data, labels, colors } = this.options;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.max(0, Math.min(width, height) / 2 - 20);

        if (radius <= 0) return;
        const total = data.reduce((a, b) => a + b, 0);

        // Animate full rotation 
        const maxAngle = Math.PI * 2 * this.progress;

        let currentAngle = -Math.PI / 2;

        data.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2;
            const drawAngle = Math.min(sliceAngle, Math.max(0, maxAngle - (currentAngle + Math.PI / 2)));

            if (drawAngle <= 0) return;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + drawAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = colors[index % colors.length];
            this.ctx.fill();

            // Border
            this.ctx.strokeStyle = this.options.borderColor || (document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#fff');
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Label (fade in)
            if (this.progress > 0.8 && drawAngle >= sliceAngle * 0.9) {
                this.ctx.globalAlpha = (this.progress - 0.8) * 5;
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

                this.ctx.fillStyle = this.options.textColor || '#fff';
                this.ctx.font = this.options.font || 'bold 12px sans-serif';
                this.ctx.textAlign = 'center';

                // Shadow for readability
                this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
                this.ctx.shadowBlur = 4;

                this.ctx.fillText(labels[index] || '', labelX, labelY);

                this.ctx.shadowColor = 'transparent'; // Reset
                this.ctx.globalAlpha = 1;
            }

            currentAngle += sliceAngle;
        });
    }

    drawAreaChart(width, height) {
        const { data, labels, colors } = this.options;
        const isSmallScreen = width < 400;
        const padding = isSmallScreen ? 20 : 40;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxValue = Math.max(...data, 1);

        // Clip region for animation (revealing from left to right)
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(padding, padding, chartWidth * this.progress, chartHeight);
        this.ctx.clip();

        // Area gradient
        const gradient = this.ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, colors[0] + '80');
        gradient.addColorStop(1, colors[0] + '10');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding + chartHeight);

        data.forEach((value, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            this.ctx.lineTo(x, y);
        });

        this.ctx.lineTo(width - padding, padding + chartHeight);
        this.ctx.closePath();
        this.ctx.fill();

        // Line
        this.ctx.strokeStyle = colors[0];
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        data.forEach((value, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();
        this.ctx.stroke();
        this.ctx.restore(); // Remove clip
    }

    drawGanttChart(width, height) {
        const { data, dataSecondary, labels, colors } = this.options;
        const isSmallScreen = width < 400;
        const paddingLeft = isSmallScreen ? 60 : 100; // More space for labels
        const paddingRight = 20;
        const paddingTop = 20;
        const paddingBottom = 40;

        const chartWidth = width - paddingLeft - paddingRight;
        const chartHeight = height - paddingTop - paddingBottom;

        // Find max total value to scale x-axis
        const totalValues = data.map((v, i) => v + (dataSecondary[i] || 0));
        const maxValue = Math.max(...totalValues, 1) * 1.1; // 10% buffer
        const textColor = this.getTextColor();

        const barHeight = (chartHeight / data.length) * 0.6;
        const gap = (chartHeight / data.length) * 0.4;

        data.forEach((val1, index) => {
            const val2 = dataSecondary[index] || 0;
            const y = paddingTop + (barHeight + gap) * index;

            // Calculate widths based on animation progress
            const totalWidth = (val1 + val2) / maxValue * chartWidth;
            const w1 = (val1 / (val1 + val2)) * totalWidth * this.progress;
            const w2 = (val2 / (val1 + val2)) * totalWidth * this.progress;

            // Draw Completed Part (Blue/Primary)
            this.ctx.fillStyle = colors[0];
            this.ctx.fillRect(paddingLeft, y, w1, barHeight);

            // Draw Remaining Part (Red/Secondary)
            this.ctx.fillStyle = colors[1] || '#ef4444';
            this.ctx.fillRect(paddingLeft + w1, y, w2, barHeight);

            // Draw Y-Axis Label
            this.ctx.fillStyle = textColor;
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'right';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(labels[index] || '', paddingLeft - 10, y + barHeight / 2);

            // Draw Value Label (if settled)
            if (this.progress > 0.9) {
                this.ctx.fillStyle = textColor;
                this.ctx.textAlign = 'left';
                this.ctx.font = '10px sans-serif';
                // Label total days
                this.ctx.fillText((val1 + val2) + 'd', paddingLeft + w1 + w2 + 5, y + barHeight / 2);
            }
        });

        // Legend
        const legendY = height - 15;
        this.ctx.fillStyle = colors[0];
        this.ctx.fillRect(width / 2 - 80, legendY, 10, 10);
        this.ctx.fillStyle = textColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText("Complete", width / 2 - 65, legendY + 9);

        this.ctx.fillStyle = colors[1] || '#ef4444';
        this.ctx.fillRect(width / 2 + 10, legendY, 10, 10);
        this.ctx.fillStyle = textColor;
        this.ctx.fillText("Remaining", width / 2 + 25, legendY + 9);
    }

    darkenColor(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, (num >> 16) - amount * 255);
        const g = Math.max(0, ((num >> 8) & 0x00FF) - amount * 255);
        const b = Math.max(0, (num & 0x0000FF) - amount * 255);
        return `rgb(${r},${g},${b})`;
    }

    updateData(newData, newLabels = null) {
        this.options.data = newData;
        if (newLabels) {
            this.options.labels = newLabels;
        }
        this.progress = 0; // Reset animation
        this.isAnimating = true;
        this.animate();
    }
}

// Global array to store chart instances for theme updates
window.chartInstances = [];

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const createChart = (id, options) => {
        if (document.getElementById(id)) {
            const chart = new Chart(id, options);
            window.chartInstances.push(chart);
            return chart;
        }
    };

    // Revenue Chart (Line)
    createChart('revenueChart', {
        type: 'line',
        data: [12000, 15000, 18000, 22000, 24580, 28000],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        colors: ['#22c55e']
    });

    // Jobs Chart (Bar)
    createChart('jobsChart', {
        type: 'bar',
        data: [15, 22, 18, 27, 25, 30],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        colors: ['#FF6B35', '#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4']
    });

    // Service Distribution (Pie)
    createChart('serviceChart', {
        type: 'pie',
        data: [35, 25, 20, 15, 5],
        labels: ['Emergency', 'Install', 'Repair', 'Maintenance', 'Other'],
        colors: ['#ef4444', '#FF6B35', '#6366f1', '#22c55e', '#f59e0b']
    });

    // Monthly Revenue (Area)
    createChart('monthlyChart', {
        type: 'area',
        data: [45000, 52000, 48000, 61000, 58000, 72000],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        colors: ['#6366f1']
    });

    // Customer Growth (Line)
    createChart('customerChart', {
        type: 'line',
        data: [120, 135, 142, 158, 165, 180],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        colors: ['#f59e0b']
    });

    // Service Requests (Bar)
    createChart('requestsChart', {
        type: 'bar',
        data: [8, 12, 10, 15, 18, 20],
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        colors: ['#22c55e']
    });

    // NEW: User Dashboard - Efficiency Chart (Pie)
    createChart('efficiencyChart', {
        type: 'pie',
        data: [75, 15, 10],
        labels: ['High', 'Mod', 'Low'],
        colors: ['#22c55e', '#facc15', '#ef4444']
    });

    // NEW: User Dashboard - Water Usage (Area)
    createChart('waterUsageChart', {
        type: 'area',
        data: [320, 310, 290, 280, 250, 240, 220],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        colors: ['#06b6d4']
    });

    // NEW: Admin Dashboard - Technician Performance (Bar)
    createChart('techPerformanceChart', {
        type: 'bar',
        data: [98, 95, 92, 88, 85, 82],
        labels: ['Mike', 'Sarah', 'Tom', 'Alex', 'John', 'Emma'],
        colors: ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f59e0b']
    });



    // Theme change observer
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                window.chartInstances.forEach(chart => chart.draw());
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});
// Home2 Specific Interactive Features
document.addEventListener('DOMContentLoaded', function () {
    initServiceAreaCards();
    initServiceCalculator();
    initRealTimeDashboard();
    initHome2UniqueAnimations();
});

// Service Area Cards Interactive
function initServiceAreaCards() {
    const areaCards = document.querySelectorAll('.service-area-card');

    areaCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            this.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = 'transparent';
        });

        card.addEventListener('click', function () {
            const area = this.getAttribute('data-area');
            alert(`PlumberPro provides comprehensive plumbing services in ${area}. Click OK to schedule a visit or call (555) 123-4567 for immediate assistance!`);
        });
    });
}

// Service Calculator
function initServiceCalculator() {
    const serviceOptions = document.querySelectorAll('input[name="service"]');
    const selectedServiceEl = document.getElementById('selectedService');
    const basePriceEl = document.getElementById('basePrice');
    const totalPriceEl = document.getElementById('totalPrice');

    const prices = {
        emergency: { name: 'Emergency Repair', base: 150, total: 150 },
        installation: { name: 'Fixture Installation', base: 200, total: 200 },
        maintenance: { name: 'Preventive Maintenance', base: 99, total: 99 }
    };

    serviceOptions.forEach(option => {
        option.addEventListener('change', function () {
            const selected = prices[this.value];
            if (selected) {
                selectedServiceEl.textContent = selected.name;
                animateCounter(basePriceEl, selected.base, '$');
                animateCounter(totalPriceEl, selected.total, '$');
            }
        });
    });
}

// Counter Animation for Numbers
function animateCounter(element, target, prefix = '') {
    if (!element) return;

    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + target;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current);
        }
    }, 30);
}

// Real-Time Dashboard
function initRealTimeDashboard() {
    // Update current time
    const timeEl = document.getElementById('currentTime');
    if (timeEl) {
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeEl.textContent = timeString;
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target')) || 0;
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Home2 Unique Animations
function initHome2UniqueAnimations() {
    // Unique parallax for home2 hero
    const hero = document.querySelector('.home2-hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            if (window.innerWidth > 768) {
                const scrolled = window.pageYOffset;
                const heroContent = hero.querySelector('.home2-hero-image');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
                }
            }
        });
    }

    // Magnetic effect for cards
    const cards = document.querySelectorAll('.home2-feature-card, .service-area-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;

            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Floating animation for process numbers
    const processNumbers = document.querySelectorAll('.process-number');
    processNumbers.forEach((num, index) => {
        num.style.animation = `floatProcess 3s ease-in-out infinite`;
        num.style.animationDelay = `${index * 0.5}s`;
    });

    // Add floating animation CSS
    if (!document.getElementById('floatProcessAnimation')) {
        const style = document.createElement('style');
        style.id = 'floatProcessAnimation';
        style.textContent = `
            @keyframes floatProcess {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-15px) rotate(5deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Gradient text animation for home2
    const gradientTexts = document.querySelectorAll('.home2-hero h1');
    gradientTexts.forEach(text => {
        const words = text.textContent.split(' ').filter(w => w.trim() !== '');
        text.innerHTML = '';
        text.style.textAlign = 'left'; // Ensure left alignment
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px) rotateX(90deg)';
            span.style.display = 'inline-block';
            span.style.marginRight = '0.25em'; // Add space between words
            span.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 100);
            text.appendChild(span);
        });
    });
}
// Interactive Map Functionality (No API Required)
document.addEventListener('DOMContentLoaded', function() {
    initInteractiveMap();
});

function initInteractiveMap() {
    const mapContainer = document.getElementById('interactiveMap');
    const mapSvg = document.getElementById('mapSvg');
    const tooltip = document.getElementById('mapTooltip');
    const officeMarker = document.getElementById('officeMarker');
    
    if (!mapContainer || !mapSvg || !tooltip) return;
    
    // Pulse animation for office marker
    const pulseRings = document.querySelectorAll('.pulse-ring');
    if (pulseRings.length > 0) {
        pulseRings.forEach((ring, index) => {
            setInterval(() => {
                ring.style.opacity = '0.1';
                ring.style.transform = `scale(${1 + index * 0.2})`;
                setTimeout(() => {
                    ring.style.opacity = '0.2';
                    ring.style.transform = 'scale(1)';
                }, 1000);
            }, 2000 + (index * 500));
        });
    }
    
    // Floating sun animation
    const sun = document.querySelector('.floating-sun');
    if (sun) {
        let sunY = 80;
        let sunDirection = 1;
        setInterval(() => {
            sunY += sunDirection * 0.5;
            if (sunY > 100 || sunY < 60) sunDirection *= -1;
            sun.setAttribute('cy', sunY);
        }, 50);
    }
    
    // Building hover effects
    const buildings = document.querySelectorAll('.map-building');
    buildings.forEach(building => {
        building.style.cursor = 'pointer';
        building.style.transition = 'opacity 0.3s, transform 0.3s';
        
        building.addEventListener('mouseenter', function(e) {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1.05)';
            const info = this.getAttribute('data-info') || 'Building';
            showTooltip(e, info);
        });
        
        building.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            hideTooltip();
        });
    });
    
    // Office marker click
    if (officeMarker) {
        officeMarker.style.cursor = 'pointer';
        officeMarker.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('PlumberPro Plumbing Office\n123 Main Street\nYour City, ST 12345\n\nClick OK to get directions!');
        });
        
        officeMarker.addEventListener('mouseenter', function(e) {
            showTooltip(e, 'Click for directions to PlumberPro Office');
            this.style.transform = 'scale(1.2)';
        });
        
        officeMarker.addEventListener('mouseleave', function() {
            hideTooltip();
            this.style.transform = 'scale(1)';
        });
    }
    
    // Tooltip functions
    function showTooltip(e, text) {
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
        
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltip.style.left = (x + 10) + 'px';
        tooltip.style.top = (y - 40) + 'px';
    }
    
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
    
    // Animate map elements on load
    setTimeout(() => {
        buildings.forEach((building, index) => {
            building.style.opacity = '0';
            building.style.transform = 'translateY(20px)';
            setTimeout(() => {
                building.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                building.style.opacity = '1';
                building.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        if (officeMarker) {
            officeMarker.style.opacity = '0';
            officeMarker.style.transform = 'scale(0)';
            setTimeout(() => {
                officeMarker.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                officeMarker.style.opacity = '1';
                officeMarker.style.transform = 'scale(1)';
            }, 800);
        }
    }, 300);
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (tooltip.style.opacity === '1') {
            hideTooltip();
        }
    });
}
