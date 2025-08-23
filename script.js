// DOM Elements
const profileImg = document.getElementById('profile-img');
const skillCards = document.querySelectorAll('.skill-card');
const projectCards = document.querySelectorAll('.project-card');
const contactCards = document.querySelectorAll('.contact-card');

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    addInteractiveEffects();
    addScrollAnimations();
});

// Initialize entrance animations
function initializeAnimations() {
    // Animate profile section
    const profileSection = document.querySelector('.profile-section');
    profileSection.style.opacity = '0';
    profileSection.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        profileSection.style.transition = 'all 1s ease';
        profileSection.style.opacity = '1';
        profileSection.style.transform = 'translateY(0)';
    }, 300);
    
    // Animate sections with staggered effect
    const sections = document.querySelectorAll('.skills-section, .projects-section, .contact-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Profile image click effect
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
    
    // Skill cards hover effects
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
            
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
            
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
        
        // Click effect for skill cards
        card.addEventListener('click', function() {
            createClickEffect(this);
        });
    });
    
    // Project cards interactive effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    tag.style.transition = 'transform 0.2s ease';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    });
    
    // Contact cards effects
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotateZ(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateZ(0deg)';
            }
        });
    });
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for cards in grids
                if (entry.target.classList.contains('skill-card') || 
                    entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('contact-card')) {
                    
                    const cards = entry.target.parentNode.querySelectorAll('.skill-card, .project-card, .contact-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Click effect animation
function createClickEffect(element) {
    const effect = document.createElement('div');
    effect.style.position = 'absolute';
    effect.style.width = '100px';
    effect.style.height = '100px';
    effect.style.background = 'radial-gradient(circle, rgba(0,212,255,0.6) 0%, transparent 70%)';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.top = '50%';
    effect.style.left = '50%';
    effect.style.transform = 'translate(-50%, -50%) scale(0)';
    effect.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    effect.style.zIndex = '10';
    
    element.style.position = 'relative';
    element.appendChild(effect);
    
    setTimeout(() => {
        effect.style.transform = 'translate(-50%, -50%) scale(2)';
        effect.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        element.removeChild(effect);
    }, 600);
}

// Project navigation function
function openProject(projectUrl) {
    // Add click animation
    createGlobalEffect();
    
    // Small delay for effect, then navigate
    setTimeout(() => {
        window.open(projectUrl, '_blank');
    }, 300);
}

// Contact navigation function
function openContact(contactUrl) {
    // Add click animation
    createGlobalEffect();
    
    // Small delay for effect, then open contact
    setTimeout(() => {
        if (contactUrl.startsWith('mailto:')) {
            window.location.href = contactUrl;
        } else {
            window.open(contactUrl, '_blank');
        }
    }, 300);
}

// Global click effect
function createGlobalEffect() {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.top = '0';
    effect.style.left = '0';
    effect.style.width = '100%';
    effect.style.height = '100%';
    effect.style.background = 'radial-gradient(circle at center, rgba(180,0,255,0.1) 0%, transparent 50%)';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';
    effect.style.opacity = '0';
    effect.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        effect.style.opacity = '0';
    }, 200);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 500);
}

// Particle system for background
function createParticles() {
    const particleCount = window.innerWidth > 768 ? 15 : 8;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 200);
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = getRandomNeonColor();
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    
    // Random starting position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    // Add glow effect
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    
    document.body.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 15000 + 10000; // 10-25 seconds
    const startTime = Date.now();
    const startY = window.innerHeight;
    const endY = -100;
    const drift = (Math.random() - 0.5) * 200; // Horizontal drift
    const startX = parseFloat(particle.style.left);
    
    function updateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            document.body.removeChild(particle);
            // Create new particle to maintain count
            setTimeout(createParticle, Math.random() * 5000 + 2000);
            return;
        }
        
        // Update position
        const currentY = startY + (endY - startY) * progress;
        const currentX = startX + drift * progress;
        
        particle.style.top = currentY + 'px';
        particle.style.left = currentX + 'px';
        
        // Fade out as it reaches the top
        if (progress > 0.7) {
            particle.style.opacity = (1 - progress) * 4;
        }
        
        requestAnimationFrame(updateParticle);
    }
    
    requestAnimationFrame(updateParticle);
}

function getRandomNeonColor() {
    const colors = [
        'rgba(0, 212, 255, 0.8)',
        'rgba(180, 0, 255, 0.8)',
        'rgba(0, 255, 136, 0.8)',
        'rgba(255, 0, 128, 0.8)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1':
            document.querySelector('.profile-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
        case '2':
            document.querySelector('.skills-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
        case '3':
            document.querySelector('.projects-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
        case '4':
            document.querySelector('.contact-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
        case 'Escape':
            // Easter egg - trigger particle burst
            for (let i = 0; i < 10; i++) {
                setTimeout(createParticle, i * 100);
            }
            break;
    }
});

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) { // Only on desktop
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        updateMouseTrail();
    }
});

function updateMouseTrail() {
    // Remove old trail elements
    const oldTrails = document.querySelectorAll('.mouse-trail');
    oldTrails.forEach(trail => trail.remove());
    
    // Create new trail elements
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.position = 'fixed';
        trail.style.left = point.x + 'px';
        trail.style.top = point.y + 'px';
        trail.style.width = '6px';
        trail.style.height = '6px';
        trail.style.background = getRandomNeonColor();
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '1000';
        trail.style.opacity = (index / maxTrailLength) * 0.5;
        trail.style.transform = 'translate(-50%, -50%)';
        trail.style.transition = 'opacity 0.1s ease';
        
        document.body.appendChild(trail);
        
        // Auto remove after short time
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    });
}

// Initialize particle system
setTimeout(createParticles, 1000);

// Performance optimization - reduce effects on mobile
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Disable mouse trail on mobile
        mouseTrail = [];
        
        // Reduce particle count
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 5) {
                particle.remove();
            }
        });
    }
}

// Handle resize
window.addEventListener('resize', function() {
    optimizeForMobile();
});

// Initial mobile optimization
optimizeForMobile();

// Console easter egg
console.log(`
╔══════════════════════════════════╗
║     🚀 CHRISTOPER PORTFOLIO      ║
║        CYBER MODE ACTIVATED      ║
╠══════════════════════════════════╣
║ Keyboard Shortcuts:              ║
║ 1 - Profile Section              ║
║ 2 - Skills Section               ║
║ 3 - Projects Section             ║
║ 4 - Contact Section              ║
║ ESC - Particle Burst Effect      ║
╚══════════════════════════════════╝
`);

// Loading animation complete
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle screen flicker effect on load
    const flicker = document.createElement('div');
    flicker.style.position = 'fixed';
    flicker.style.top = '0';
    flicker.style.left = '0';
    flicker.style.width = '100%';
    flicker.style.height = '100%';
    flicker.style.background = 'rgba(0, 212, 255, 0.05)';
    flicker.style.pointerEvents = 'none';
    flicker.style.zIndex = '10000';
    flicker.style.opacity = '1';
    
    document.body.appendChild(flicker);
    
    setTimeout(() => {
        flicker.style.transition = 'opacity 0.5s ease';
        flicker.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flicker);
        }, 500);
    }, 100);
});

// Additional cyberpunk effects
function addCyberpunkGlitch() {
    const elements = document.querySelectorAll('.name, .section-title');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const originalText = this.textContent;
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            let glitchText = '';
            
            // Create glitch effect
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7 && originalText[i] !== ' ') {
                    glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchText += originalText[i];
                }
            }
            
            this.textContent = glitchText;
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 150);
        });
    });
}

// Initialize glitch effect
setTimeout(addCyberpunkGlitch, 2000);

// Matrix rain effect (minimal for performance)
function createMatrixRain() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const matrixContainer = document.createElement('div');
    matrixContainer.id = 'matrix-rain';
    matrixContainer.style.position = 'fixed';
    matrixContainer.style.top = '0';
    matrixContainer.style.left = '0';
    matrixContainer.style.width = '100%';
    matrixContainer.style.height = '100%';
    matrixContainer.style.pointerEvents = 'none';
    matrixContainer.style.zIndex = '-2';
    matrixContainer.style.opacity = '0.1';
    
    document.body.appendChild(matrixContainer);
    
    // Create matrix columns
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
        if (Math.random() > 0.8) { // Only 20% of columns have rain
            setTimeout(() => {
                createMatrixColumn(i * 20);
            }, Math.random() * 5000);
        }
    }
}

function createMatrixColumn(x) {
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const column = document.createElement('div');
    column.style.position = 'absolute';
    column.style.left = x + 'px';
    column.style.top = '-100px';
    column.style.color = 'rgba(0, 255, 136, 0.8)';
    column.style.fontSize = '14px';
    column.style.fontFamily = 'monospace';
    column.style.lineHeight = '1.2';
    column.style.whiteSpace = 'pre';
    
    // Generate random characters
    let text = '';
    for (let i = 0; i < 20; i++) {
        text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '\n';
    }
    column.textContent = text;
    
    const matrixContainer = document.getElementById('matrix-rain');
    if (matrixContainer) {
        matrixContainer.appendChild(column);
        
        // Animate column falling
        animateMatrixColumn(column);
    }
}

function animateMatrixColumn(column) {
    const duration = Math.random() * 10000 + 15000; // 15-25 seconds
    const startTime = Date.now();
    const startY = -100;
    const endY = window.innerHeight + 100;
    
    function updateColumn() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            column.remove();
            // Randomly create new column
            if (Math.random() > 0.7) {
                setTimeout(() => {
                    createMatrixColumn(Math.random() * window.innerWidth);
                }, Math.random() * 10000 + 5000);
            }
            return;
        }
        
        const currentY = startY + (endY - startY) * progress;
        column.style.top = currentY + 'px';
        
        // Random character changes
        if (Math.random() > 0.9) {
            const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const lines = column.textContent.split('\n');
            const randomLine = Math.floor(Math.random() * lines.length);
            if (lines[randomLine]) {
                lines[randomLine] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                column.textContent = lines.join('\n');
            }
        }
        
        requestAnimationFrame(updateColumn);
    }
    
    requestAnimationFrame(updateColumn);
}

// Initialize matrix rain after page load
window.addEventListener('load', function() {
    setTimeout(createMatrixRain, 3000);
});

// Typing effect for project descriptions
function addTypingEffect() {
    const descriptions = document.querySelectorAll('.project-desc');
    
    descriptions.forEach(desc => {
        const originalText = desc.textContent;
        desc.textContent = '';
        
        desc.parentNode.addEventListener('mouseenter', function() {
            if (desc.textContent === originalText) return;
            
            let index = 0;
            const typeInterval = setInterval(() => {
                desc.textContent = originalText.slice(0, index);
                index++;
                
                if (index > originalText.length) {
                    clearInterval(typeInterval);
                }
            }, 30);
        });
        
        desc.parentNode.addEventListener('mouseleave', function() {
            desc.textContent = originalText;
        });
    });
}

// Initialize typing effect
setTimeout(addTypingEffect, 3000);

// Final initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Cyberpunk Portfolio Initialized');
    
    // Add custom cursor for desktop
    if (window.innerWidth > 768) {
        document.body.style.cursor = 'none';
        
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '10000';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.transition = 'all 0.1s ease';
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-card, .skill-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(180,0,255,0.8) 0%, transparent 70%)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%)';
            });
        });
    }
});