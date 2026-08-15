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
    const available = tabs.map(tab => tab.dataset.workLanguage);

    function setActiveLanguage(lang) {
      if (!available.includes(lang)) return;

      page.dataset.activeLanguage = lang;
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

    // Keep the note language aligned with the global switcher whenever that
    // language exists in the source document. If it does not, preserve the
    // reader's current note rather than silently falling back to another one.
    I18n.onChange(lang => {
      if (available.includes(lang)) setActiveLanguage(lang);
    });

    setActiveLanguage(available.includes(I18n.currentLang()) ? I18n.currentLang() : available[0]);
  }
};
