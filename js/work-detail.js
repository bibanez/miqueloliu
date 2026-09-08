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
    const content = page.querySelector('.work-detail-content');
    const noteLabels = {
      ca: 'nota de programa',
      es: 'nota de programa',
      en: 'programme note',
      fr: 'note de programme',
      de: 'Programmnotiz',
      eu: 'programa-oharra'
    };

    function findWork(id) {
      if (typeof WORKS === 'undefined') return null;
      for (const category of WORKS) {
        for (const work of category.works || []) {
          if (work.id === id) return work;
          const part = (work.parts || []).find(item => item.id === id);
          if (part) return part;
        }
      }
      return null;
    }

    function renderRecordings() {
      if (!content || typeof RecordingPlayer === 'undefined') return;
      const work = findWork(page.dataset.workId);
      const recordings = work && work.recordings ? work.recordings : [];
      let mount = page.querySelector('.work-detail-recordings');

      if (!recordings.length) {
        if (mount) mount.remove();
        return;
      }

      const recordingsId = `audio-${page.dataset.workId}`;

      if (!mount) {
        mount = document.createElement('section');
        mount.className = 'work-detail-recordings';
        mount.id = recordingsId;
        content.before(mount);
      }

      mount.innerHTML = recordings.map(recording => RecordingPlayer.render(recording, {
        variant: 'compact',
      })).join('');
      mount.hidden = false;
      I18n.apply();
      RecordingPlayer.bind(mount);
    }

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
      renderRecordings();
    });

    setActiveLanguage(available.includes(I18n.currentLang()) ? I18n.currentLang() : available[0]);
    renderRecordings();
  }
};
