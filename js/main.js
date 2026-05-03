// Core UI — runs regardless of GSAP availability
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAQ();
  initPickerCards();
  initCategoryTabs();
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
  const heroText = document.querySelector('.hero__text');
  const heroMedia = document.querySelector('.hero__media');
  if (!heroText) return;
  gsap.from(Array.from(heroText.children), {
    opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1
  });
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
