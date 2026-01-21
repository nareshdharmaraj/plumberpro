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
