gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAQ();
  initPickerCards();
  if (!prefersReducedMotion) {
    initHeroEntrance();
    initScrollReveals();
    initCardHover();
  }
});

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
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.1
  });
  if (heroMedia) {
    gsap.from(heroMedia, { opacity: 0, y: 40, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  }
}

function initScrollReveals() {
  document.querySelectorAll('.gsap-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.gsap-stagger').forEach(grid => {
    const children = Array.from(grid.children);
    if (!children.length) return;
    gsap.from(children, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08
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
  document.querySelectorAll('.faq__question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const parent = q.closest('.faq');
      if (!item || !parent) return;
      const isOpen = item.classList.contains('open');
      parent.querySelectorAll('.faq__item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initPickerCards() {
  document.querySelectorAll('.picker-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('selected'));
  });
}
