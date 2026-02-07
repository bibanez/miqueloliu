/*
 * Shared components — nav & footer
 *
 * Injected via JS so every page shares a single source of truth.
 * After injection, i18n.init() translates all data-i18n elements.
 */

const Components = (() => {

  /** Detect which page is active based on the filename. */
  function activePage() {
    const slug = window.location.pathname.replace(/\/?(index)?(\.html)?$/, '').split('/').pop();
    if (slug === 'catalogue')  return 'catalogue';
    if (slug === 'recordings') return 'recordings';
    if (slug === 'press')      return 'press';
    if (slug === 'contact')    return 'contact';
    return 'home';
  }

  function renderNav() {
    const active = activePage();
    const link = (href, key) => {
      const isActive = key === active ? ' class="active"' : '';
      return `<li><a href="${href}"${isActive} data-i18n="nav.${key}"></a></li>`;
    };

    return `
    <nav>
      <div class="nav-inner">
        <a href="index.html" class="site-name">Miquel Oliu</a>
        <button class="nav-toggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          ${link('index.html',      'home')}
          ${link('catalogue.html',  'catalogue')}
          ${link('recordings.html', 'recordings')}
          ${link('press.html',      'press')}
          ${link('contact.html',    'contact')}
          <li>
            <div class="lang-switcher">
              <button data-lang="ca">CA</button>
              <button data-lang="es">ES</button>
              <button data-lang="en">EN</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>`;
  }

  function renderFooter() {
    return `
    <footer>
      <p data-i18n="footer.copyright"></p>
    </footer>`;
  }

  /** Inject nav + footer, then initialise i18n and mobile toggle. */
  function init() {
    const navContainer = document.getElementById('nav-container');
    const footerContainer = document.getElementById('footer-container');

    if (navContainer)    navContainer.innerHTML = renderNav();
    if (footerContainer) footerContainer.innerHTML = renderFooter();

    // Mobile hamburger toggle
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }

    // Init translations after DOM is populated
    I18n.init();
  }

  return { init, activePage };
})();
