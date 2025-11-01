// Inicializar AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
}

// Menu mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
  const icon = mobileMenu.querySelector('i');

  const toggleMenu = () => {
    const isActive = navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('open', isActive);
    mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    if (icon) {
      icon.classList.toggle('fa-bars', !isActive);
      icon.classList.toggle('fa-xmark', isActive);
    }
  };

  mobileMenu.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
  });
}

// Header scroll effect
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '15px 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
}

// Lightbox simples e acessível para imagens de depoimentos
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let lastFocus = null;

  const open = (src, alt, text) => {
    if (!img) return;
    img.src = src;
    img.alt = alt || '';
    if (caption) caption.textContent = text || '';
    lastFocus = document.activeElement;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  };

  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    img.src = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a.lightbox-trigger');
    if (!trigger) return;
    e.preventDefault();
    const src = trigger.getAttribute('href');
    const text = trigger.getAttribute('data-caption') || '';
    const alt = trigger.getAttribute('aria-label') || text || 'Imagem ampliada';
    open(src, alt, text);
  });

  // Fechar ao clicar no botão ou no fundo
  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

// Rotação infinita de cards em grids (fade 300ms, pausa ao hover)
(function initRotatingGrids() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grids = document.querySelectorAll('.media-grid[data-rotate="true"]');
  if (!grids.length) return;

  grids.forEach((grid) => {
    const TRANSITION_MS = 300; // fade
    const INTERVAL_MS = 2500; // tempo entre rotações
    let timer = null;
    let isVisible = false;

    // marca grid como rotativo (aplica will-change)
    grid.classList.add('rotating');

    const rotateOnce = () => {
      const first = grid.firstElementChild;
      if (!first) return;
      first.classList.add('fade-out');
      setTimeout(() => {
        grid.appendChild(first);
        first.classList.remove('fade-out');
      }, TRANSITION_MS);
    };

    const start = () => {
      if (timer || prefersReduced) return;
      timer = setInterval(rotateOnce, INTERVAL_MS);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    // Pausar ao passar mouse sobre o card ou grid
    grid.addEventListener('mouseenter', stop);
    grid.addEventListener('mouseleave', start);

    // Otimizar: iniciar somente quando visível na viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          start();
        } else {
          isVisible = false;
          stop();
        }
      });
    }, { threshold: 0.1 });

    io.observe(grid);
  });
})();