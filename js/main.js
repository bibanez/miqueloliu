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
});
