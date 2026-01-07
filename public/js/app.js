// ==========================================
// MOBILE MENU
// ==========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ne pas empêcher le comportement par défaut pour les liens vides
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px pour la navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// INTERSECTION OBSERVER - REVEAL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animation des barres de compétences
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// Observer tous les éléments avec animations
const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .skill-item, .project-card, .favorite-card');
animatedElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ==========================================
// TYPING EFFECT
// ==========================================
const typingText = document.querySelector('.typing-text');

if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.display = 'block';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Garder le curseur qui clignote
            typingText.classList.add('typing-complete');
        }
    }
    
    // Démarrer l'effet de typing après un court délai
    setTimeout(type, 500);
}

// ==========================================
// PARALLAX EFFECT (HERO SECTION)
// ==========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            // Parallax sur le contenu
            const parallaxSpeed = 0.5;
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    });
}

// ==========================================
// FORM HANDLING
// ==========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';
            
            // Reset après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
    
    // Animation des inputs au focus
    const formInputs = contactForm.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// ==========================================
// PROJECT CARDS HOVER EFFECT 3D
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// CAROUSELS (PROJETS & PROFIL)
// 3 éléments visibles (desktop), navigation par "page"
// ==========================================
const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const items = track ? Array.from(track.querySelectorAll('.carousel-item')) : [];
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!track || items.length === 0) return;

    let currentIndex = 0;

    const getItemWidth = () => {
        if (items.length === 0) return 0;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || '0');
        const itemWidth = items[0].getBoundingClientRect().width;
        // Retourner la largeur d'un seul élément + gap (pour décaler d'un élément à la fois)
        return itemWidth + gap;
    };

    const maxIndex = Math.max(0, items.length - 3); // Maximum pour toujours avoir 3 éléments visibles

    const updateSlide = () => {
        const itemWidth = getItemWidth();
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    prevBtn?.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = maxIndex; // Revenir à la fin pour faire une boucle
        } else {
            currentIndex -= 1;
        }
        updateSlide();
    });

    nextBtn?.addEventListener('click', () => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Revenir au début pour faire une boucle
        } else {
            currentIndex += 1;
        }
        updateSlide();
    });
});

// ==========================================
// ACTIVE SECTION HIGHLIGHTING IN NAV
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================
// PRELOADER (OPTIONNEL)
// ==========================================
window.addEventListener('load', () => {
    // Masquer le scroll indicator après quelques secondes
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }, 5000);
        
        // Réafficher au survol de la zone
        hero?.addEventListener('mouseenter', () => {
            if (window.pageYOffset < 100) {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Animation d'entrée pour tous les éléments visibles
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.hero-content > *');
        visibleElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Activer un effet spécial
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Créer l'animation rainbow si elle n'existe pas
        if (!document.querySelector('#rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🎮 Konami Code activé ! Vous avez trouvé l\'easter egg !');
    }
});

console.log('%c👨‍💻 Portfolio créé avec ❤️', 'font-size: 20px; color: #00d9ff; font-weight: bold;');
console.log('%cSi vous lisez ceci, vous êtes probablement un développeur curieux. Bienvenue ! 😊', 'font-size: 14px; color: #7b2cbf;');

