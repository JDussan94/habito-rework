// Habitolife — shared JS
// Initialized after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbarScroll();
  initFAQ();
});

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:64px;left:0;height:1px;width:1px;';
  document.body.prepend(sentinel);
  const obs = new IntersectionObserver(
    ([entry]) => navbar.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );
  obs.observe(sentinel);
}

function initFAQ() {
  document.querySelectorAll('.faq__question').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const isOpen = item.classList.contains('open');
      q.closest('.faq').querySelectorAll('.faq__item.open').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
