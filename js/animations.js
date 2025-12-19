// ==================================================
// ADVANCED ANIMATIONS & EFFECTS
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    class Typewriter {
        constructor(element) {
            this.element = element;
            this.texts = JSON.parse(element.getAttribute('data-text') || '[]');
            this.currentTextIndex = 0;
            this.currentCharIndex = 0;
            this.isDeleting = false;
            this.typeSpeed = 100;
            this.deleteSpeed = 50;
            this.pauseTime = 2000;
            
            this.type();
        }
        
        type() {
            const currentText = this.texts[this.currentTextIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                this.typeSpeed = this.deleteSpeed;
            } else {
                this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                this.typeSpeed = 100;
            }
            
            if (!this.isDeleting && this.currentCharIndex === currentText.length) {
                this.typeSpeed = this.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                this.typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        }
    }
    
    // Initialize typewriter
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        new Typewriter(element);
    });
    
    // ============================================
    // COUNTER ANIMATION
    // ============================================
    class Counter {
        constructor(element) {
            this.element = element;
            this.target = parseInt(element.getAttribute('data-count') || 0);
            this.current = 0;
            this.increment = Math.ceil(this.target / 100);
            this.speed = Math.min(Math.max(1000 / this.target, 10), 100);
            
            this.count();
        }
        
        count() {
            this.current += this.increment;
            
            if (this.current >= this.target) {
                this.element.textContent = this.target;
            } else {
                this.element.textContent = this.current;
                setTimeout(() => this.count(), this.speed);
            }
        }
    }
    
    // Initialize counters when in viewport
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => new Counter(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) counterObserver.observe(heroSection);
    
    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach(item => {
                    const level = item.getAttribute('data-level');
                    const skillLevel = item.querySelector('.skill-level');
                    if (skillLevel) {
                        setTimeout(() => {
                            skillLevel.style.width = `${level}%`;
                        }, 200);
                    }
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) skillObserver.observe(skillsSection);
    
    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ============================================
    // GLITCH EFFECT
    // ============================================
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.classList.add('glitching');
            setTimeout(() => {
                element.classList.remove('glitching');
            }, 300);
        }, 5000);
    });
    
    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    function createParticles(container, count = 50) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random animation delay
            const delay = Math.random() * 3;
            
            particle.style.cssText = `
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            container.appendChild(particle);
        }
    }
    
    // Initialize particles in specific elements
    const particleContainers = document.querySelectorAll('.particles');
    particleContainers.forEach(container => {
        createParticles(container, 30);
    });
    
    // ============================================
    // BINARY RAIN EFFECT
    // ============================================
    function createBinaryRain(container) {
        const binaryChars = '01';
        let binaryText = '';
        
        // Create multiple lines of binary
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 30; j++) {
                binaryText += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            }
            binaryText += '\n';
        }
        
        const binaryElement = document.createElement('div');
        binaryElement.classList.add('binary-code');
        binaryElement.textContent = binaryText;
        
        container.appendChild(binaryElement);
        
        // Clone for seamless animation
        const clone = binaryElement.cloneNode(true);
        container.appendChild(clone);
    }
    
    const binaryContainers = document.querySelectorAll('.binary-container');
    binaryContainers.forEach(container => {
        createBinaryRain(container);
    });
    
    // ============================================
    // HOVER TILT EFFECT
    // ============================================
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ============================================
    // RANDOM COLOR CYCLING
    // ============================================
    const colorCycleElements = document.querySelectorAll('.color-cycle');
    
    colorCycleElements.forEach(element => {
        const colors = [
            '#38bdf8', '#8b5cf6', '#10b981', '#f59e0b',
            '#ef4444', '#ec4899', '#06b6d4', '#84cc16'
        ];
        
        let currentColorIndex = 0;
        
        setInterval(() => {
            element.style.color = colors[currentColorIndex];
            currentColorIndex = (currentColorIndex + 1) % colors.length;
        }, 2000);
    });
    
    // ============================================
    // MOUSE TRAIL EFFECT
    // ============================================
    const trailElements = [];
    const trailCount = 10;
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
    
    let trailIndex = 0;
    
    document.addEventListener('mousemove', (e) => {
        const trail = trailElements[trailIndex];
        
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        trail.style.opacity = '0.5';
        
        setTimeout(() => {
            trail.style.opacity = '0';
        }, 300);
        
        trailIndex = (trailIndex + 1) % trailCount;
    });
    
    // ============================================
    // TEXT SCRAMBLE EFFECT
    // ============================================
    class TextScramble {
        constructor(element) {
            this.element = element;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
            this.queue = [];
            this.frame = 0;
            this.resolve = null;
        }
        
        setText(newText) {
            const oldText = this.element.innerText;
            const length = Math.max(oldText.length, newText.length);
            
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            
            this.element.innerText = output;
            
            if (complete === this.queue.length) {
                if (this.resolve) this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Initialize text scramble on specific elements
    const scrambleElements = document.querySelectorAll('.scramble-text');
    scrambleElements.forEach(element => {
        const scramble = new TextScramble(element);
        
        // Example usage:
        // scramble.setText('New Text Here');
    });
    
    // ============================================
    // REAL-TIME CLOCK
    // ============================================
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const clockElements = document.querySelectorAll('.real-time-clock');
        clockElements.forEach(element => {
            element.textContent = timeString;
        });
    }
    
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
    
    // ============================================
    // RANDOM DATA GENERATOR (for demo purposes)
    // ============================================
    function generateRandomIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
    
    function generateRandomHex() {
        return Math.random().toString(16).substr(2, 8);
    }
    
    // Update demo data elements
    const demoDataElements = document.querySelectorAll('.demo-data');
    setInterval(() => {
        demoDataElements.forEach(element => {
            if (element.classList.contains('ip-address')) {
                element.textContent = generateRandomIP();
            } else if (element.classList.contains('hex-data')) {
                element.textContent = generateRandomHex();
            }
        });
    }, 3000);
    
    // ============================================
    // CONFETTI EFFECT
    // ============================================
    window.createConfetti = function(x, y) {
        const colors = ['#38bdf8', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let rotation = 0;
            let opacity = 1;
            let gravity = 0.1;
            
            function animate() {
                posX += vx;
                posY += vy;
                vy += gravity;
                rotation += 5;
                opacity -= 0.02;
                
                confetti.style.transform = `translate(${posX - x}px, ${posY - y}px) rotate(${rotation}deg)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            animate();
        }
    };
});
