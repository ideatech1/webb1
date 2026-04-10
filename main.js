/* ═══════════════════════════════════════════
   IDEA TECH — main.js  (complete)
   ═══════════════════════════════════════════ */

// ─── Scroll reveal ───────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ─── Project card hover ───────────────────────
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

// ─── Mobile menu ─────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ─── Navbar scroll shadow ────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,.5)' : 'none';
});

// ─── Responsive grids ────────────────────────
const statsGrid = document.querySelector('.stats-grid');
function applyStatsGrid() {
  if (!statsGrid) return;
  statsGrid.style.gridTemplateColumns = window.innerWidth < 640 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
}
applyStatsGrid();

function responsiveGrids() {
  const w = window.innerWidth;
  document.querySelectorAll('#work .project-card').forEach((c, i) => {
    c.style.gridColumn = w < 768 ? 'span 12' : (i === 0 ? 'span 8' : i === 1 ? 'span 4' : 'span 12');
  });
  const pg = document.querySelector('.pricing-grid');
  if (pg) pg.style.gridTemplateColumns = w < 900 ? '1fr' : 'repeat(3,1fr)';
  const cg = document.querySelector('.contact-grid');
  if (cg) cg.style.gridTemplateColumns = w < 768 ? '1fr' : '1fr 1.2fr';
}
responsiveGrids();
window.addEventListener('resize', () => { applyStatsGrid(); responsiveGrids(); });

// ═══════════════════════════════════════════════════════════
//  LANGUAGE SYSTEM — full bilingual support
// ═══════════════════════════════════════════════════════════
let currentLang = localStorage.getItem('lang') || 'en';

/* Store bilingual values on an element */
function setI18n(el, en, ar) {
  if (!el) return;
  el.setAttribute('data-en', en || '');
  el.setAttribute('data-ar', ar || en || '');
}

/* Apply current lang to ONE element */
function applyLangEl(el) {
  if (!el) return;
  const text = el.getAttribute('data-' + currentLang);
  if (text === null || text === undefined) return;

  if (el.tagName === 'OPTION') { el.textContent = text || el.textContent; return; }
  if (!text) return;

  // pricing-feature: keep the icon span, replace only the text node
  if (el.classList.contains('pricing-feature')) {
    const icon = el.querySelector('span');
    el.textContent = ' ' + text;
    if (icon) el.prepend(icon);
    return;
  }

  if (el.getAttribute('data-html') === 'true') el.innerHTML = text;
  else el.textContent = text;
  if (el.tagName === 'LABEL') el.style.textAlign = currentLang === 'ar' ? 'right' : '';
}

/* Full page language pass */
window.setLang = function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  const slider = document.getElementById('langSlider');
  const btnEn  = document.getElementById('btn-en');
  const btnAr  = document.getElementById('btn-ar');

  if (lang === 'ar') {
    if (slider) slider.style.transform = 'translateX(44px)';
    if (btnEn)  btnEn.classList.remove('lang-active');
    if (btnAr)  btnAr.classList.add('lang-active');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    // Mobile slider
    const sliderM = document.getElementById('langSliderMobile');
    const btnEnM  = document.getElementById('btn-en-m');
    const btnArM  = document.getElementById('btn-ar-m');
    if (sliderM) sliderM.style.transform = 'translateX(44px)';
    if (btnEnM)  btnEnM.classList.remove('lang-active');
    if (btnArM)  btnArM.classList.add('lang-active');
  } else {
    if (slider) slider.style.transform = 'translateX(0)';
    if (btnEn)  btnEn.classList.add('lang-active');
    if (btnAr)  btnAr.classList.remove('lang-active');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    // Mobile slider
    const sliderM = document.getElementById('langSliderMobile');
    const btnEnM  = document.getElementById('btn-en-m');
    const btnArM  = document.getElementById('btn-ar-m');
    if (sliderM) sliderM.style.transform = 'translateX(0)';
    if (btnEnM)  btnEnM.classList.add('lang-active');
    if (btnArM)  btnArM.classList.remove('lang-active');
  }

  // All [data-en] elements (including pricing-feature, mobile links, options...)
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.tagName === 'OPTION') return; // handled below
    applyLangEl(el);
  });

  // <option> elements
  document.querySelectorAll('option[data-en]').forEach(opt => applyLangEl(opt));

  // Placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    const ph = el.getAttribute('data-placeholder-' + lang);
    if (ph) el.placeholder = ph;
  });

  // Hero Arabic subtitle — show only in AR
  const heroSub = document.getElementById('hero-subtitle');
  if (heroSub) heroSub.style.display = lang === 'en' ? 'none' : '';

  // Contact title AR — show only in AR
  const ctitleAr = document.querySelector('.contact-title-ar');
  if (ctitleAr) ctitleAr.style.display = lang === 'en' ? 'none' : '';

  // Footer bottom line
  const ftBottom = document.getElementById('footer-bottom-text');
  if (ftBottom) {
    const company = document.getElementById('site-footer-name')?.textContent || 'IDEA TECH';
    ftBottom.innerHTML = lang === 'ar'
      ? `© 2024 ${company}. جميع الحقوق محفوظة | <span>نحوّل أفكارك إلى واقع تقني</span>`
      : `© 2024 ${company}. All rights reserved. | <span>We turn your ideas into tech reality.</span>`;
  }

  // Page title
  const siteName = document.getElementById('site-nav-name')?.textContent || 'IDEA TECH';
  document.title = lang === 'ar'
    ? siteName + ' | نحوّل أفكارك إلى واقع تقني'
    : siteName + ' | Transforming Visions into Reality';
};

// ═══════════════════════════════════════════════════════════
//  FIREBASE CONFIG HOOKS — called from module script
// ═══════════════════════════════════════════════════════════

/* siteConfig/general */
window.applySiteConfig = function(d) {
  if (!d) return;

  if (d.company) {
    ['site-nav-name','site-footer-name','admin-site-name','admin-site-name2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = d.company;
    });
    // Refresh footer copyright with new company name
    const ftBottom = document.getElementById('footer-bottom-text');
    if (ftBottom) {
      ftBottom.innerHTML = currentLang === 'ar'
        ? `© 2024 ${d.company}. جميع الحقوق محفوظة | <span>نحوّل أفكارك إلى واقع تقني</span>`
        : `© 2024 ${d.company}. All rights reserved. | <span>We turn your ideas into tech reality.</span>`;
    }
  }

  if (d.tagline || d.taglineEn) {
    const ar = d.tagline   || '';
    const en = d.taglineEn || d.tagline || '';
    const heroSub = document.getElementById('hero-subtitle');
    if (heroSub) {
      setI18n(heroSub, en, ar);
      if (currentLang === 'ar') heroSub.textContent = ar;
    }
    const ftTag = document.getElementById('site-footer-tagline');
    if (ftTag) {
      setI18n(ftTag, en, ar);
      ftTag.textContent = currentLang === 'ar' ? ar : en;
    }
  }

  ['email','address'].forEach(field => {
    if (!d[field]) return;
    const el = document.getElementById('site-' + field);
    if (el) { el.textContent = d[field]; setI18n(el, d[field], d[field]); }
  });
};

/* siteConfig/pricing */
window.applyPricingConfig = function(data) {
  if (!data) return;
  const keys  = ['starter', 'growth', 'enterprise'];
  const cards = document.querySelectorAll('.pricing-card');

  keys.forEach((k, i) => {
    const p = data[k];
    if (!p || !cards[i]) return;
    const card = cards[i];

    // Name
    const nameEl = card.querySelector('.pricing-name');
    if (nameEl && p.nameAr) {
      setI18n(nameEl, nameEl.getAttribute('data-en') || p.nameAr, p.nameAr);
      applyLangEl(nameEl);
    }

    // Price (no translation needed)
    const priceEl = card.querySelector('.pricing-price');
    if (priceEl && p.price) priceEl.textContent = p.price;

    // Desc
    const descEl = card.querySelector('.pricing-desc');
    if (descEl) {
      const en = p.descEn || descEl.getAttribute('data-en') || p.desc || '';
      const ar = p.desc   || descEl.getAttribute('data-ar') || '';
      setI18n(descEl, en, ar);
      applyLangEl(descEl);
    }

    // Features — stored as Arabic array from admin; render with both attrs
    if (p.features && p.features.length) {
      const ul = card.querySelector('.pricing-features');
      if (ul) {
        const cls = i === 2 ? 'secondary' : '';
        ul.innerHTML = p.features.map(f => {
          // Try to split "EN|AR" if admin stored both, else use same for both
          const parts = f.split('|');
          const en = (parts[1] || parts[0]).trim();
          const ar = parts[0].trim();
          return `<li class="pricing-feature ${cls}" data-en="${en}" data-ar="${ar}"><span class="material-symbols-outlined">check_circle</span> ${currentLang === 'ar' ? ar : en}</li>`;
        }).join('');
      }
    }
  });
};

/* siteConfig/services */
window.applyServicesConfig = function(list) {
  if (!list || !list.length) return;
  const grid = document.querySelector('.services-grid');
  if (!grid) return;

  const delays = [0, 0.07, 0.14, 0.21, 0.28, 0.35];
  grid.innerHTML = list.map((s, i) => {
    const nameEn = s.nameEn || s.nameAr || '';
    const nameAr = s.nameAr || '';
    const descEn = s.descEn || s.descAr || '';
    const descAr = s.descAr || '';
    const shown  = currentLang === 'ar';
    return `
      <div class="glass service-card reveal" style="transition-delay:${delays[i]||0}s">
        <span class="material-symbols-outlined service-icon" style="color:${s.color||'#00C853'}">${s.icon||'star'}</span>
        <h3 class="service-title" data-en="${nameEn}" data-ar="${nameAr}">${shown ? nameAr : nameEn}</h3>
        <p  class="service-desc"  data-en="${descEn}" data-ar="${descAr}">${shown ? descAr : descEn}</p>
        <a href="#" class="service-link" data-en="Learn More →" data-ar="اعرف المزيد ←">${shown ? 'اعرف المزيد ←' : 'Learn More →'}</a>
      </div>`;
  }).join('');

  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};

// ─── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => window.setLang(currentLang));
