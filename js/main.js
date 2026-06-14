/*
 * Main entry point
 *
 * Initialises shared components (nav, footer, i18n) and then runs
 * any page-specific setup via data-page on <main>.
 */

document.addEventListener('DOMContentLoaded', () => {
  Components.init();

  // Run page-specific logic if a page initialiser is defined
  const page = Components.activePage();
  if (typeof PageInit !== 'undefined' && typeof PageInit[page] === 'function') {
    PageInit[page]();
  }

  // Home hero: the nav floats transparent over the photo, then condenses into
  // a solid bar once the hero has mostly scrolled away.
  if (document.body.classList.contains('has-hero')) {
    const navContainer = document.getElementById('nav-container');
    const hero = document.querySelector('.home-hero');
    if (navContainer && hero) {
      let ticking = false;
      const sync = () => {
        const threshold = hero.offsetHeight * 0.6;
        navContainer.classList.toggle('condensed', window.scrollY > threshold);
        ticking = false;
      };
      sync();
      window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(sync); ticking = true; }
      }, { passive: true });
    }
  }

  // Subtle reveal-on-scroll for home page text blocks
  const revealEls = document.querySelectorAll('.quote, .home-intro, .testimonial, .home-links');
  if (revealEls.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
});
