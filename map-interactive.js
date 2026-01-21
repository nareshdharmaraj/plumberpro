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
