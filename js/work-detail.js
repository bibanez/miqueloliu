/*
 * Work-detail language tabs
 *
 * The website language (CA/ES/EN in the shared navigation) translates the
 * chrome around the page. These tabs choose the language of the programme
 * note itself, which may also be French, German, or Euskera.
 */

var PageInit = {
  'work-detail': () => {
    const page = document.querySelector('main[data-page="work-detail"]');
    if (!page) return;

    const tabs = [...page.querySelectorAll('[data-work-language]')];
    const blocks = [...page.querySelectorAll('[data-detail-lang]')];
    const label = page.querySelector('.work-detail-language-label');
    const stickyTitle = page.querySelector('.work-detail-sticky-title');
    const header = page.querySelector('.work-detail-header');
    const languageNav = page.querySelector('.work-detail-language-nav');
    const available = tabs.map(tab => tab.dataset.workLanguage);
    const noteLabels = {
      ca: 'nota de programa',
      es: 'nota de programa',
      en: 'programme note',
      fr: 'note de programme',
      de: 'Programmnotiz',
      eu: 'programa-oharra'
    };

    function updateNoteLabel(lang) {
      if (label) label.textContent = noteLabels[lang] || 'programme note';
    }

    function setActiveLanguage(lang) {
      if (!available.includes(lang)) return;

      page.dataset.activeLanguage = lang;
      updateNoteLabel(lang);
      const title = page.querySelector(`[data-detail-lang="${lang}"] h1`);
      if (stickyTitle && title) stickyTitle.textContent = title.textContent;
      tabs.forEach(tab => {
        const active = tab.dataset.workLanguage === lang;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      blocks.forEach(block => {
        const active = block.dataset.detailLang === lang;
        block.classList.toggle('is-active', active);
        block.hidden = !active;
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => setActiveLanguage(tab.dataset.workLanguage));
    });

    // Once the title has scrolled away, show its compact counterpart in the
    // sticky bar. CSS handles the transition so it remains stable everywhere.
    if (header && languageNav && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        languageNav.classList.toggle('is-scrolled', !entry.isIntersecting);
      }, { rootMargin: `-${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px 0px` });
      observer.observe(header);
    }

    // Keep the note language aligned with the global switcher whenever that
    // language exists in the source document. If it does not, preserve the
    // reader's current note rather than silently falling back to another one.
    I18n.onChange(lang => {
      if (available.includes(lang)) setActiveLanguage(lang);
    });

    setActiveLanguage(available.includes(I18n.currentLang()) ? I18n.currentLang() : available[0]);
  }
};
