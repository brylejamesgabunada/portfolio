// ========================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initTerminalTyping();
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for skill cards
        const delay = entry.target.classList.contains('skill-card') 
          ? index * 100 
          : 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible', 'animate');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => observer.observe(el));
  skillCards.forEach(el => observer.observe(el));
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// TERMINAL TYPING EFFECT
// ========================================

function initTerminalTyping() {
  const terminalLines = document.querySelectorAll('.hero .terminal-line');
  
  // Reset animations for fresh typing effect
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    line.style.animation = 'none';
    
    // Trigger reflow
    void line.offsetWidth;
    
    // Re-apply animation with stagger
    setTimeout(() => {
      line.style.animation = `terminalFadeIn 0.5s forwards`;
    }, 300 + (index * 400));
  });
  
  // Add typing effect to values
  const values = document.querySelectorAll('.hero .terminal-value');
  values.forEach((value, index) => {
    const text = value.textContent;
    value.textContent = '';
    
    setTimeout(() => {
      typeText(value, text, 40);
    }, 600 + (index * 400));
  });
}

function typeText(element, text, speed) {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// ========================================
// CURSOR BLINK (Already handled in CSS)
// ========================================

// Additional enhancements can be added here

// ========================================
// PARALLAX EFFECT (Subtle)
// ========================================

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.setProperty('--scroll', scrolled * 0.3 + 'px');
  }
});

// ========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

document.addEventListener('keydown', (e) => {
  // Skip to main content on Tab
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========================================
// PERFORMANCE: Debounce scroll handler
// ========================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
