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
