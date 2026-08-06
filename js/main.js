/* ============================================================
   Rest Comanda — Landing Page
   Interacciones: menú móvil, reveal, contadores, galería, FAQ
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Menú móvil ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  function setMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  }

  menuBtn.addEventListener('click', () => {
    setMenu(mobileMenu.classList.contains('hidden'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  /* ---------- Navbar: sombra al hacer scroll ---------- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('shadow-lg', window.scrollY > 8);
    navbar.classList.toggle('shadow-black/30', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Contadores animados ---------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('es-PE');
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Nav links activos por sección ---------- */
  const sections = ['problema', 'caracteristicas', 'como-funciona', 'galeria', 'reportes', 'faq', 'contacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('#nav-links .nav-link');

  if ('IntersectionObserver' in window && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => spyObserver.observe(s));
  }

  /* ---------- Galería / carousel ---------- */
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('gallery-dots');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const total = slides.length;
  let index = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Ir a la captura ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
    restartAuto();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('#galeria') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      e.key === 'ArrowRight' ? next() : prev();
    }
  });

  /* Swipe táctil */
  const carousel = document.getElementById('carousel');
  let touchStartX = 0;
  let touchDelta = 0;

  carousel.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchDelta = 0;
      pauseAuto();
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchmove',
    (e) => {
      touchDelta = e.touches[0].clientX - touchStartX;
    },
    { passive: true }
  );

  carousel.addEventListener('touchend', () => {
    if (Math.abs(touchDelta) > 48) {
      touchDelta > 0 ? prev() : next();
    } else {
      restartAuto();
    }
  });

  /* Auto-avance cada 5 s, pausa al pasar el mouse */
  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }
  function pauseAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }
  function restartAuto() {
    pauseAuto();
    startAuto();
  }

  carousel.addEventListener('mouseenter', pauseAuto);
  carousel.addEventListener('mouseleave', startAuto);
  startAuto();
})();
