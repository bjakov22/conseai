// ── Language switcher ──
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Swap textContent for elements with data-en / data-sr
  document.querySelectorAll('[data-en][data-sr]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Swap placeholder for inputs/textareas
  document.querySelectorAll('[data-ph-en][data-ph-sr]').forEach(el => {
    el.placeholder = lang === 'sr' ? el.dataset.phSr : el.dataset.phEn;
  });

  // Swap <option> text inside <select>
  document.querySelectorAll('select option[data-en][data-sr]').forEach(opt => {
    opt.textContent = opt.dataset[lang];
  });

  // Update active button state
  document.querySelectorAll('.nav__lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update page title
  document.title = lang === 'sr'
    ? 'CONSEAI — Savetovanje i Pametno Inženjerstvo sa AI'
    : 'CONSEAI — Consulting & Smart Engineering with AI';
}

document.querySelectorAll('.nav__lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ── Sticky nav shadow on scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile burger menu ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = currentLang === 'sr' ? 'Poruka poslata ✓' : 'Message Sent ✓';
  btn.style.background = '#16A34A';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 4000);
});

// ── Fade-in on scroll ──
const fadeEls = document.querySelectorAll(
  '.service-card, .why__card, .product__feature, .hero__stats, .about__card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});
