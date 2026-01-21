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
        return isDark ? '#f1f5f9' : '#64748b';
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
        this.ctx.lineWidth = 1;

        const gridLines = isSmallScreen ? 3 : 5;
        for (let i = 0; i <= gridLines; i++) {
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
                this.ctx.fillText(labels[index] || '', x, height - 10);
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
        const radius = Math.min(width, height) / 2 - 20;
        const total = data.reduce((a, b) => a + b, 0);
        const textColor = this.getTextColor();

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
            this.ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Label (fade in)
            if (this.progress > 0.8 && drawAngle >= sliceAngle * 0.9) {
                this.ctx.globalAlpha = (this.progress - 0.8) * 5;
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

                this.ctx.fillStyle = '#fff';
                this.ctx.font = 'bold 12px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(labels[index] || '', labelX, labelY);
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

    // NEW: Admin Dashboard - Customer Satisfaction (Line)
    createChart('satisfactionChart', {
        type: 'line',
        data: [4.2, 4.3, 4.5, 4.6, 4.8, 4.9],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        colors: ['#22c55e']
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
