// Core UI — runs regardless of GSAP availability
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAQ();
  initPickerCards();
  initCategoryTabs();
  initMarquee();
  initHeroGrain();
  initTestimonialGrain();
});

// Animations — requires GSAP
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) {
      initHeroEntrance();
      initScrollReveals();
      initCardHover();
    }
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

function initHeroEntrance() {
  const heroContent = document.querySelector('.hero-video__content');
  const heroText = document.querySelector('.hero__text');
  if (heroContent) {
    gsap.from(Array.from(heroContent.children), {
      opacity: 0, y: 36, duration: 1.0, ease: 'power3.out', stagger: 0.13, delay: 0.15
    });
    return;
  }
  if (!heroText) return;
  gsap.from(Array.from(heroText.children), {
    opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1
  });
  const heroMedia = document.querySelector('.hero__media');
  if (heroMedia) {
    gsap.from(heroMedia, { opacity: 0, y: 40, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  }
}

function initScrollReveals() {
  document.querySelectorAll('.gsap-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      opacity: 0, y: 30, duration: 0.7, ease: 'power2.out'
    });
  });
  document.querySelectorAll('.gsap-stagger').forEach(grid => {
    const children = Array.from(grid.children);
    if (!children.length) return;
    gsap.from(children, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.08
    });
  });
}

function initCardHover() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -2, duration: 0.2, ease: 'power1.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.2, ease: 'power1.out' }));
  });
}

function initFAQ() {
  document.querySelectorAll('.faq').forEach((faqGroup, gi) => {
    faqGroup.querySelectorAll('.faq__item').forEach((item, i) => {
      const btn = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      if (!btn || !answer) return;
      const id = `faq-answer-${gi}-${i}`;
      answer.id = id;
      btn.setAttribute('aria-controls', id);
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqGroup.querySelectorAll('.faq__item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
}

function initPickerCards() {
  document.querySelectorAll('.picker-card').forEach(card => {
    const name = card.querySelector('.picker-card__name');
    card.setAttribute('role', 'checkbox');
    card.setAttribute('aria-checked', card.classList.contains('selected') ? 'true' : 'false');
    card.setAttribute('aria-label', name ? name.textContent.trim() : 'Product');
    card.setAttribute('tabindex', '0');
    const toggle = () => {
      const checked = card.classList.toggle('selected');
      card.setAttribute('aria-checked', checked ? 'true' : 'false');
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
}

function initCategoryTabs() {
  document.querySelectorAll('.category-tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-tabs__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initHeroGrain() {
  const hero = document.querySelector('.hero-video');
  const grain = document.querySelector('.hero-video__grain');
  if (!grain || !hero) return;

  const W = hero.offsetWidth || window.innerWidth;
  const H = hero.offsetHeight || window.innerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  const ctx = canvas.getContext('2d');

  // Splatter origin: top-right corner
  const ox = W;
  const oy = 0;
  const maxDist = Math.sqrt(W * W + H * H);

  const ITERATIONS = 8000;
  for (let i = 0; i < ITERATIONS; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const dist = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
    const proximity = 1 - dist / maxDist; // 1 at corner, 0 at far edge
    const splatter = Math.pow(proximity, 1.3);

    // Reject dots far from the corner — denser near origin
    if (Math.random() > splatter) continue;

    const r = (Math.random() * 2.8 + 0.4) * (0.3 + 0.7 * proximity);
    const opacity = (Math.random() * 0.7 + 0.3) * proximity;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210,38,48,${Math.min(opacity, 1).toFixed(3)})`;
    ctx.fill();
  }

  grain.appendChild(canvas);
}

function initTestimonialGrain() {
  const corners = (W, H) => [[0, 0], [W, 0], [0, H], [W, H]];

  document.querySelectorAll('.testimonial-card').forEach(card => {
    const W = card.offsetWidth || 320;
    const H = card.offsetHeight || 340;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:0;';
    const ctx = canvas.getContext('2d');

    const [ox, oy] = corners(W, H)[Math.floor(Math.random() * 4)];
    const maxDist = Math.sqrt(W * W + H * H);
    const power = 1.2 + Math.random() * 0.8; // 1.2–2.0, varies per card

    const ITERATIONS = 2200;
    for (let i = 0; i < ITERATIONS; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const dist = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
      const proximity = 1 - dist / maxDist;
      const splatter = Math.pow(proximity, power);

      if (Math.random() > splatter) continue;

      const r = (Math.random() * 2.4 + 0.3) * (0.4 + 0.6 * proximity);
      const opacity = (Math.random() * 0.65 + 0.2) * proximity;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,38,48,${Math.min(opacity, 1).toFixed(3)})`;
      ctx.fill();
    }

    card.insertBefore(canvas, card.firstChild);
  });
}

function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;
  requestAnimationFrame(() => {
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;
    let x = 0;
    (function tick() {
      x -= 0.15;
      if (x <= -halfWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(tick);
    })();
  });
}
