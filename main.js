// ═══════════════════════════════════════════════
// STEFANO ERRANI — main.js
// Comportamenti condivisi tra tutte le pagine
// ═══════════════════════════════════════════════

// ─── Mobile Navigation ────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navClose   = document.getElementById('navClose');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose && mobileNav) {
    navClose.addEventListener('click', closeMobileNav);
  }
})();

function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ─── Smooth scroll per anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach(el => {
  el.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      closeMobileNav();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Nav active link on scroll ────────────────
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href && href.includes('#' + current) && current) {
        link.style.color = 'var(--primary-mid)';
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
})();

// ─── Animazione numeri al scroll ──────────────
(function () {
  const animatedNumbers = document.querySelectorAll('.hero-number strong, .problem-number, .score-number');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  animatedNumbers.forEach(el => observer.observe(el));
})();

// ─── Fade-in on scroll ────────────────────────
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Seleziona elementi da animare
  const targets = document.querySelectorAll('.step, .case-card, .blog-card, .risk-area, .hero h1, .hero-sub');
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();
