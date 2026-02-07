/*
 * i18n — Lightweight translation engine
 *
 * Usage in HTML:
 *   <span data-i18n="nav.home">Home</span>
 *
 * The engine replaces the text content of every element that has a data-i18n
 * attribute with the matching key from TRANSLATIONS[lang].
 *
 * Special placeholders like {year} are replaced at render time.
 */

const I18n = (() => {
  const DEFAULT_LANG = 'ca';
  const SUPPORTED = ['ca', 'es', 'en'];
  const STORAGE_KEY = 'miqueloliu_lang';

  /** Get the stored language or fall back to the default. */
  function currentLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    // Try browser language
    const browserLang = navigator.language.slice(0, 2);
    if (SUPPORTED.includes(browserLang)) return browserLang;
    return DEFAULT_LANG;
  }

  /** Persist the chosen language. */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    updateSwitcher(lang);
    document.documentElement.lang = lang;
  }

  /** Look up a key, with fallback to the key itself. */
  function t(key, lang) {
    lang = lang || currentLang();
    const str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || key;
    // Replace placeholders
    return str.replace(/\{year\}/g, new Date().getFullYear());
  }

  /** Apply translations to every element with data-i18n. */
  function apply(lang) {
    lang = lang || currentLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key, lang);
    });
  }

  /** Highlight the active language button. */
  function updateSwitcher(lang) {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  /** Initialize: apply translations and bind switcher buttons. */
  function init() {
    const lang = currentLang();
    document.documentElement.lang = lang;
    apply(lang);
    updateSwitcher(lang);

    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  return { currentLang, setLang, t, apply, init };
})();
