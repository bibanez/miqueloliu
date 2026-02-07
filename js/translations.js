/*
 * Translations — Catalan (ca), Spanish (es), English (en)
 *
 * To add a new key:
 *   1. Add it under every language with the same key name.
 *   2. In the HTML, use  data-i18n="section.key"  on the element.
 *
 * To add a new language:
 *   1. Add a new top-level object (e.g. "fr": { ... }) with all keys.
 *   2. Add a button in the lang-switcher inside components.js.
 */

const TRANSLATIONS = {

  /* ——— Catalan ——— */
  ca: {
    // Navigation
    'nav.home':        'Inici',
    'nav.catalogue':   'Catàleg',
    'nav.recordings':  'Enregistraments',
    'nav.press':       'Premsa',
    'nav.contact':     'Contacte',

    // Frontpage
    'home.subtitle':       'compositor',
    'home.bio.title':      'Biografia',
    'home.bio.text':       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'home.latest.title':   'Darreres novetats',
    'home.latest.empty':   'Pròximament.',

    // Catalogue
    'catalogue.title':       'Catàleg',
    'catalogue.description': 'Obres per a diverses formacions instrumentals i vocals.',
    'catalogue.loading':     'Carregant catàleg…',
    'catalogue.empty':       'El catàleg es carregarà properament.',
    'catalogue.col.title':   'Títol',
    'catalogue.col.year':    'Any',
    'catalogue.col.instrumentation': 'Instrumentació',
    'catalogue.col.duration': 'Durada',

    // Recordings
    'recordings.title':       'Enregistraments',
    'recordings.description': 'Selecció d\'enregistraments disponibles.',
    'recordings.loading':     'Carregant enregistraments…',
    'recordings.empty':       'Els enregistraments es carregaran properament.',

    // Press
    'press.title':       'Premsa',
    'press.description': 'Ressenyes, entrevistes i mencions als mitjans.',
    'press.loading':     'Carregant premsa…',
    'press.empty':       'Les entrades de premsa es carregaran properament.',

    // Contact
    'contact.title':       'Contacte',
    'contact.description': 'Per a consultes sobre partitures, encàrrecs o col·laboracions.',
    'contact.email.label': 'Correu electrònic',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Xarxes socials',
    'contact.general.label': 'Informació general',
    'contact.general.text':  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Tots els drets reservats.',
  },

  /* ——— Spanish ——— */
  es: {
    // Navigation
    'nav.home':        'Inicio',
    'nav.catalogue':   'Catálogo',
    'nav.recordings':  'Grabaciones',
    'nav.press':       'Prensa',
    'nav.contact':     'Contacto',

    // Frontpage
    'home.subtitle':       'compositor',
    'home.bio.title':      'Biografía',
    'home.bio.text':       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'home.latest.title':   'Últimas novedades',
    'home.latest.empty':   'Próximamente.',

    // Catalogue
    'catalogue.title':       'Catálogo',
    'catalogue.description': 'Obras para diversas formaciones instrumentales y vocales.',
    'catalogue.loading':     'Cargando catálogo…',
    'catalogue.empty':       'El catálogo se cargará próximamente.',
    'catalogue.col.title':   'Título',
    'catalogue.col.year':    'Año',
    'catalogue.col.instrumentation': 'Instrumentación',
    'catalogue.col.duration': 'Duración',

    // Recordings
    'recordings.title':       'Grabaciones',
    'recordings.description': 'Selección de grabaciones disponibles.',
    'recordings.loading':     'Cargando grabaciones…',
    'recordings.empty':       'Las grabaciones se cargarán próximamente.',

    // Press
    'press.title':       'Prensa',
    'press.description': 'Reseñas, entrevistas y menciones en medios.',
    'press.loading':     'Cargando prensa…',
    'press.empty':       'Las entradas de prensa se cargarán próximamente.',

    // Contact
    'contact.title':       'Contacto',
    'contact.description': 'Para consultas sobre partituras, encargos o colaboraciones.',
    'contact.email.label': 'Correo electrónico',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Redes sociales',
    'contact.general.label': 'Información general',
    'contact.general.text':  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Todos los derechos reservados.',
  },

  /* ——— English ——— */
  en: {
    // Navigation
    'nav.home':        'Home',
    'nav.catalogue':   'Catalogue',
    'nav.recordings':  'Recordings',
    'nav.press':       'Press',
    'nav.contact':     'Contact',

    // Frontpage
    'home.subtitle':       'composer',
    'home.bio.title':      'Biography',
    'home.bio.text':       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'home.latest.title':   'Latest news',
    'home.latest.empty':   'Coming soon.',

    // Catalogue
    'catalogue.title':       'Catalogue',
    'catalogue.description': 'Works for various instrumental and vocal ensembles.',
    'catalogue.loading':     'Loading catalogue…',
    'catalogue.empty':       'The catalogue will be available soon.',
    'catalogue.col.title':   'Title',
    'catalogue.col.year':    'Year',
    'catalogue.col.instrumentation': 'Instrumentation',
    'catalogue.col.duration': 'Duration',

    // Recordings
    'recordings.title':       'Recordings',
    'recordings.description': 'A selection of available recordings.',
    'recordings.loading':     'Loading recordings…',
    'recordings.empty':       'Recordings will be available soon.',

    // Press
    'press.title':       'Press',
    'press.description': 'Reviews, interviews and media mentions.',
    'press.loading':     'Loading press…',
    'press.empty':       'Press entries will be available soon.',

    // Contact
    'contact.title':       'Contact',
    'contact.description': 'For enquiries about scores, commissions or collaborations.',
    'contact.email.label': 'Email',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Social media',
    'contact.general.label': 'General information',
    'contact.general.text':  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. All rights reserved.',
  },
};
