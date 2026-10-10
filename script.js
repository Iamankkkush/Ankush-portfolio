const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Reveal sections gently as they enter the viewport.
const revealTargets = document.querySelectorAll('.intro, .section-head, .project, .about-layout, .tool-strip, .services-heading, .service-list > div, .contact > *');
revealTargets.forEach((el, index) => {
  el.classList.add('js-reveal');
  if (el.classList.contains('project')) el.style.transitionDelay = `${(index % 4) * 70}ms`;
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// Subtle cursor parallax for the hero cards; disabled on touch devices and reduced-motion settings.
const heroArt = document.querySelector('#hero-art');
const motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroArt && !motionOff && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cards = heroArt.querySelectorAll('.float-card');
  heroArt.addEventListener('pointermove', event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    cards.forEach(card => {
      const depth = Number(card.dataset.depth || 12);
      const rotate = card.classList.contains('card-film') ? -10 : card.classList.contains('card-photo') ? 9 : 5;
      card.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(${rotate + x * 2}deg)`;
    });
  });
  heroArt.addEventListener('pointerleave', () => {
    cards.forEach(card => {
      const rotate = card.classList.contains('card-film') ? -10 : card.classList.contains('card-photo') ? 9 : 5;
      card.style.transform = `translate3d(0,0,0) rotate(${rotate}deg)`;
    });
  });
}
