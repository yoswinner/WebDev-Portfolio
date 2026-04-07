document.addEventListener('DOMContentLoaded', () => {
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== SMOOTH SCROLL FOR NAVIGATION ====================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== CTA BUTTON SCROLL ====================
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ctaBtn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ==================== SCROLL ANIMATION FOR ELEMENTS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.about-card, .skill-card, .project-card, .achievement-item, .hobby-item, .contact-link'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // ==================== GALAXY ANIMATION (VIDEO-LIKE BG) ====================
    class GalaxyAnimation {
        constructor(canvasId, colors) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.colors = colors;
            this.particles = [];
            this.init();
            
            window.addEventListener('resize', () => {
                this.init();
            });
            this.animate();
        }
        
        init() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = this.canvas.parentElement.offsetHeight || window.innerHeight;
            this.cx = this.width / 2;
            this.cy = this.height / 2;
            this.particles = [];
            
            const num = window.innerWidth < 768 ? 400 : 800;
            const numArms = 3;
            
            for (let i = 0; i < num; i++) {
                const dist = Math.random() * Math.max(this.width, this.height) * 0.6;
                const armOffset = (Math.floor(Math.random() * numArms) / numArms) * Math.PI * 2;
                const angleOffset = dist * 0.003; // Spiral twist
                const scatter = (Math.random() - 0.5) * 1.5;
                
                this.particles.push({
                    angle: armOffset + angleOffset + scatter,
                    dist: dist,
                    speed: 0.001 + (1 / (dist + 50)) * 0.3, // Inner spins faster
                    size: Math.random() * 2 + 0.3,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)],
                    alpha: Math.random() * 0.6 + 0.4,
                    tilt: 0.4 // 3D oval perspective
                });
            }
        }
        
        animate() {
            // Slight clear to leave trailing effect
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.particles.forEach(p => {
                p.angle -= p.speed; // Rotate
                const x = this.cx + Math.cos(p.angle) * p.dist;
                const y = this.cy + Math.sin(p.angle) * p.dist * p.tilt;
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fill();
            });
            
            this.ctx.globalAlpha = 1;
            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize Galaxy animations for Hero and Contact
    new GalaxyAnimation('hero-galaxy', ['#00ff00', '#00ffcc', '#a855f7', '#ffffff']);
    new GalaxyAnimation('contact-galaxy', ['#a855f7', '#00ffcc', '#00ff00', '#ffffff']);

    // ==================== HOVER EFFECTS ON INTERACTIVE ELEMENTS ====================
    const hoverElements = document.querySelectorAll('.tag, .btn, .contact-link, .nav-link');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s ease';
        });
    });

    // ==================== SCROLL PROGRESS INDICATOR ====================
    const createScrollProgress = () => {
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ff00, #00ffcc);
            z-index: 999;
            width: 0%;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    };

    createScrollProgress();

    // ==================== CONSOLE MESSAGE ====================
    console.log('%c🚀 Yash Pradhan | Portfolio Loaded', 'color: #00ff00; font-weight: bold; font-size: 1.2rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);');
    console.log('%cRegistration: 24BCE0702 | VIT CSE', 'color: #00ffcc; font-size: 1rem;');
    console.log('%cWeb Programming FS 25-26 Assignment', 'color: #a855f7; font-size: 0.9rem;');
});

// ==================== PREVENT LAYOUT SHIFT ====================
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});