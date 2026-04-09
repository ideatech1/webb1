/* ═══════════ IDEA TECH — main.js ═══════════ */

// ─── Scroll reveal ───
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ─── Project card overlay hover ───
document.querySelectorAll('.project-card').forEach(card => {
  const overlay = card.querySelector('.project-overlay');
  const btn     = card.querySelector('.project-btn');
  card.addEventListener('mouseenter', () => {
    if (overlay) overlay.style.transform = 'translateY(0)';
    if (btn)     btn.style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    if (overlay) overlay.style.transform = 'translateY(8px)';
    if (btn)     btn.style.opacity = '0';
  });
});

// ─── Language toggle ───
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  const slider = document.getElementById('langSlider');
  const btnEn  = document.getElementById('btn-en');
  const btnAr  = document.getElementById('btn-ar');

  if (lang === 'ar') {
    slider.style.transform = 'translateX(44px)';
    btnEn.classList.remove('lang-active');
    btnAr.classList.add('lang-active');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    slider.style.transform = 'translateX(0)';
    btnEn.classList.add('lang-active');
    btnAr.classList.remove('lang-active');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }

  // Update all elements that have data-en / data-ar attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.tagName === 'OPTION') return;
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.getAttribute('data-html') === 'true') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
    if (el.tagName === 'LABEL') {
      el.style.textAlign = lang === 'ar' ? 'right' : '';
    }
  });

  // Translate <option> elements
  document.querySelectorAll('option[data-en]').forEach(opt => {
    const text = opt.getAttribute('data-' + lang);
    if (text) opt.textContent = text;
  });

  // Translate placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    const ph = el.getAttribute('data-placeholder-' + lang);
    if (ph) el.placeholder = ph;
  });

  // Hero Arabic subtitle visibility
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.style.display = lang === 'en' ? 'none' : '';
  }
}

// ─── Mobile menu ───
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ─── Navbar shadow on scroll ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,.5)' : 'none';
});

// ─── Stats responsive ───
const statsGrid = document.querySelector('.stats-grid');
function applyStatsGrid() {
  if (!statsGrid) return;
  statsGrid.style.gridTemplateColumns = window.innerWidth < 640 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
}
applyStatsGrid();
window.addEventListener('resize', applyStatsGrid);

// ─── Responsive grids ───
function responsiveGrids() {
  const w = window.innerWidth;

  // Work bento
  const cards = document.querySelectorAll('#work .project-card');
  cards.forEach((c, i) => {
    if (w < 768) {
      c.style.gridColumn = 'span 12';
    } else {
      if      (i === 0) c.style.gridColumn = 'span 8';
      else if (i === 1) c.style.gridColumn = 'span 4';
      else              c.style.gridColumn = 'span 12';
    }
  });

  // Pricing grid
  const pricingGrid = document.querySelector('.pricing-grid');
  if (pricingGrid) {
    pricingGrid.style.gridTemplateColumns = w < 900 ? '1fr' : 'repeat(3,1fr)';
  }

  // Contact grid
  const contactGrid = document.querySelector('.contact-grid');
  if (contactGrid) {
    contactGrid.style.gridTemplateColumns = w < 768 ? '1fr' : '1fr 1.2fr';
  }
}
responsiveGrids();
window.addEventListener('resize', responsiveGrids);

// ─── Init language on page load ───
document.addEventListener('DOMContentLoaded', () => setLang('en'));
