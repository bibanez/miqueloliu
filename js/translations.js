/*
 * Translations — Catalan (ca), Spanish (es), English (en)
 *
 * To add a new key:
 *   1. Add it under every language with the same key name.
 *   2. In the HTML, use  data-i18n="section.key"  on the element
 *      (or data-i18n-html for keys containing HTML markup).
 *
 * To add a new language:
 *   1. Add a new top-level object (e.g. "fr": { ... }) with all keys.
 *   2. Add a button in the lang-switcher inside components.js.
 *
 * Notes:
 *   - The Rilke quote has no English version yet: the German original is
 *     shown for 'en' (pending confirmation from Miquel).
 *   - The Antoni Clapés poem is intentionally kept in Catalan in all languages.
 */

const TRANSLATIONS = {

  /* ——— Catalan ——— */
  ca: {
    // Navigation
    'nav.home':        'Inici',
    'nav.biography':   'Biografia',
    'nav.catalogue':   'Obres',
    'nav.recordings':  'Enregistraments',
    'nav.press':       'Premsa',
    'nav.contact':     'Contacte',

    // Frontpage — hero
    'home.hero.subtitle': 'compositor',

    // Frontpage — testimonials label
    'home.testimonials.label': 'Sobre la seva música',

    // Frontpage — Rilke quote
    'home.quote.text':
      '«Estimo de la meva existència les hores tenebroses<br>' +
      'en què s’aprofundeixen els meus sentits;…<br><br>' +
      '…en elles he après que una segona vida<br>' +
      'immensa, intemporal, d’amplis espais tinc.»',
    'home.quote.attribution':
      'Rainer Maria Rilke<br><span class="quote-source">Das Stunden-Buch (El llibre d’hores)</span>',

    // Frontpage — testimonials
    'home.testimonial.humet.text':
      '<p>«Hi ha poca música tan delicada i evocadora com la d’en Miquel Oliu. Domini dels materials, forma extraordinàriament fluïda, imatges poètiques penetrants, silencis profunds i excepcional capacitat comunicativa: un compositor brillant.»</p>',
    'home.testimonial.humet.author': 'Ramon Humet, compositor',
    'home.testimonial.guix.text':
      '<p>«La teva música sembla defugir el neguit a què ens aboca el dia a dia. Crea un veritable refugi sonor, un moment íntim, delicat, ple de subtileses i de fluïdesa.</p>' +
      '<p>L’harmonia i els colors basteixen un univers ric en matisos; a mi m’atrau, sobretot, aquesta llum meridional que conté i que, lluny d’enlluernar, destaca molt més les irisacions. Hi percebo una claror mediterrània més que no pas núvols centreeuropeus -tu ja m’entens-, i saps que comparteixo també amb tu el gust per les troballes espectrals i per les ressonàncies orientals.</p>' +
      '<p>Només puc dir-te que, quan escolto les teves obres, sovint penso que m’hauria agradat compondre-les jo. I és que, més enllà de l’ofici i del saber fer -que hi és!-, les teves peces contenen "poesia" i són, per damunt de tot, “música”.»</p>',
    'home.testimonial.guix.author': 'Josep Mª Guix, compositor',
    'home.testimonial.clapes.text':
      'escolto la teva música<br><br>' +
      'sento una inacció audaç<br>' +
      'que m’obre les portes de la reflexió<br>' +
      'els teus silencis demanen<br>' +
      'ser escoltats en solitari<br><br>' +
      'perquè aquests sons<br>' +
      'no provenen del buit<br>' +
      'del no-res<br><br>' +
      'són presència d’un silenci primigeni<br>' +
      'que reclama un elevat afany d’abstracció<br>' +
      'per poder acoblar emoció i pensament<br><br>' +
      'm’aturo — per anar més lluny<br><br>' +
      'potser més enllà dels jardins del silenci.',
    'home.testimonial.clapes.author': 'Antoni Clapés, poeta',

    // Biography
    'bio.title': 'Biografia',

    // Works
    'catalogue.title':       'Obres',
    'catalogue.description': 'Catàleg d’obres per a diverses formacions instrumentals i vocals.',
    'catalogue.empty':       'El catàleg es carregarà properament.',
    'works.link.audio':      'àudio',
    'works.link.score':      'partitura',
    'works.link.note':       'nota de programa',
    'works.link.info':       '+info',

    // Recordings
    'recordings.title':       'Enregistraments',
    'recordings.description': 'Selecció d\'enregistraments disponibles.',
    'recordings.empty':       'Els enregistraments es carregaran properament.',

    // Press
    'press.title':       'Premsa',
    'press.description': 'Ressenyes, entrevistes i mencions als mitjans.',
    'press.empty':       'Les entrades de premsa es carregaran properament.',

    // Contact
    'contact.title':       'Contacte',
    'contact.description': 'Per a consultes sobre partitures, encàrrecs o col·laboracions.',
    'contact.email.label': 'Correu electrònic',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Xarxes socials',
    'contact.general.label': 'Informació general',
    'contact.general.text':  'Per a qualsevol consulta, podeu escriure al correu electrònic indicat.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Tots els drets reservats.',
  },

  /* ——— Spanish ——— */
  es: {
    // Navigation
    'nav.home':        'Inicio',
    'nav.biography':   'Biografía',
    'nav.catalogue':   'Obras',
    'nav.recordings':  'Grabaciones',
    'nav.press':       'Prensa',
    'nav.contact':     'Contacto',

    // Frontpage — hero
    'home.hero.subtitle': 'compositor',

    // Frontpage — testimonials label
    'home.testimonials.label': 'Sobre su música',

    // Frontpage — Rilke quote
    'home.quote.text':
      '«Amo de mi existencia las horas tenebrosas<br>' +
      'en que se profundizan mis sentidos;…<br><br>' +
      '…en ellas he aprendido que una segunda vida<br>' +
      'inmensa, intemporal, de amplios espacios tengo.»',
    'home.quote.attribution':
      'Rainer Maria Rilke<br><span class="quote-source">Das Stunden-Buch (El libro de horas)</span>',

    // Frontpage — testimonials
    'home.testimonial.humet.text':
      '<p>«Hay poca música tan delicada y evocadora como la de Miquel Oliu. Dominio de los materiales, forma extraordinariamente fluida, imágenes poéticas penetrantes, silencios profundos y excepcional capacidad comunicativa: un compositor brillante.»</p>',
    'home.testimonial.humet.author': 'Ramon Humet, compositor',
    'home.testimonial.guix.text':
      '<p>«Tu música parece rehuir el ansia a que nos aboca el día a día. Crea un verdadero refugio sonoro, un momento íntimo, delicado, lleno de sutilezas y de fluidez.</p>' +
      '<p>La armonía y los colores abastan un universo rico en matices; a mí me atrae, sobretodo, esta luz meridional que contiene y que, lejos de deslumbrar, destaca mucho más las irisaciones. Percibo en ella una claridad mediterránea más que las nubes centroeuropeas -tú ya me entiendes-, y sabes que comparto también contigo el gusto por los hallazgos espectrales y por las resonancias orientales.</p>' +
      '<p>Solo puedo decirte que, cuando escucho tus obras, a menudo pienso que me habría gustado componerlas yo. Y es que, más allá del oficio y del saber hacer -¡que está!-, tus piezas contienen "poesía" y son, por encima de todo, “música”.»</p>',
    'home.testimonial.guix.author': 'Josep Mª Guix, compositor',
    'home.testimonial.clapes.text':
      'escolto la teva música<br><br>' +
      'sento una inacció audaç<br>' +
      'que m’obre les portes de la reflexió<br>' +
      'els teus silencis demanen<br>' +
      'ser escoltats en solitari<br><br>' +
      'perquè aquests sons<br>' +
      'no provenen del buit<br>' +
      'del no-res<br><br>' +
      'són presència d’un silenci primigeni<br>' +
      'que reclama un elevat afany d’abstracció<br>' +
      'per poder acoblar emoció i pensament<br><br>' +
      'm’aturo — per anar més lluny<br><br>' +
      'potser més enllà dels jardins del silenci.',
    'home.testimonial.clapes.author': 'Antoni Clapés, poeta',

    // Biography
    'bio.title': 'Biografía',

    // Works
    'catalogue.title':       'Obras',
    'catalogue.description': 'Catálogo de obras para diversas formaciones instrumentales y vocales.',
    'catalogue.empty':       'El catálogo se cargará próximamente.',
    'works.link.audio':      'audio',
    'works.link.score':      'partitura',
    'works.link.note':       'nota de programa',
    'works.link.info':       '+info',

    // Recordings
    'recordings.title':       'Grabaciones',
    'recordings.description': 'Selección de grabaciones disponibles.',
    'recordings.empty':       'Las grabaciones se cargarán próximamente.',

    // Press
    'press.title':       'Prensa',
    'press.description': 'Reseñas, entrevistas y menciones en medios.',
    'press.empty':       'Las entradas de prensa se cargarán próximamente.',

    // Contact
    'contact.title':       'Contacto',
    'contact.description': 'Para consultas sobre partituras, encargos o colaboraciones.',
    'contact.email.label': 'Correo electrónico',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Redes sociales',
    'contact.general.label': 'Información general',
    'contact.general.text':  'Para cualquier consulta, puede escribir al correo electrónico indicado.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Todos los derechos reservados.',
  },

  /* ——— English ——— */
  en: {
    // Navigation
    'nav.home':        'Home',
    'nav.biography':   'Biography',
    'nav.catalogue':   'Works',
    'nav.recordings':  'Recordings',
    'nav.press':       'Press',
    'nav.contact':     'Contact',

    // Frontpage — hero
    'home.hero.subtitle': 'composer',

    // Frontpage — testimonials label
    'home.testimonials.label': 'On his music',

    // Frontpage — Rilke quote (German original; no English version provided yet)
    'home.quote.text':
      '«Ich liebe meines Wesens Dunkelstunden,<br>' +
      'in welchen meine Sinne sich vertiefen;…<br><br>' +
      '…aus ihnen kommt mir Wissen, dass ich Raum<br>' +
      'zu einem zweiten zeitlos breiten Leben habe.»',
    'home.quote.attribution':
      'Rainer Maria Rilke<br><span class="quote-source">Das Stunden-Buch</span>',

    // Frontpage — testimonials
    'home.testimonial.humet.text':
      '<p>«There is little music as delicate and evocative as that of Miquel Oliu. Mastery of materials, an extraordinarily fluid sense of form, striking poetic imagery, profound silences, and an exceptional communicative ability: a brilliant composer.»</p>',
    'home.testimonial.humet.author': 'Ramon Humet, composer',
    'home.testimonial.guix.text':
      '<p>«Your music seems to shy away from the restlessness into which everyday life drives us. It creates a genuine sonic refuge, an intimate, delicate moment, full of subtlety and fluidity.</p>' +
      '<p>Harmony and color build a universe rich in nuance; what draws me most, above all, is that southern light it contains, which—far from dazzling—brings out the iridescence all the more. I sense in it a Mediterranean clarity rather than central European clouds—you know what I mean—and you know that I also share with you a taste for spectral discoveries and for eastern resonances.</p>' +
      '<p>I can only say that, when I listen to your works, I often find myself wishing I had composed them myself. For beyond craftsmanship and know-how—which are certainly there!—, your pieces contain “poetry” and are, above all, “music”.»</p>',
    'home.testimonial.guix.author': 'Josep Mª Guix, composer',
    'home.testimonial.clapes.text':
      'escolto la teva música<br><br>' +
      'sento una inacció audaç<br>' +
      'que m’obre les portes de la reflexió<br>' +
      'els teus silencis demanen<br>' +
      'ser escoltats en solitari<br><br>' +
      'perquè aquests sons<br>' +
      'no provenen del buit<br>' +
      'del no-res<br><br>' +
      'són presència d’un silenci primigeni<br>' +
      'que reclama un elevat afany d’abstracció<br>' +
      'per poder acoblar emoció i pensament<br><br>' +
      'm’aturo — per anar més lluny<br><br>' +
      'potser més enllà dels jardins del silenci.',
    'home.testimonial.clapes.author': 'Antoni Clapés, poet',

    // Biography
    'bio.title': 'Biography',

    // Works
    'catalogue.title':       'Works',
    'catalogue.description': 'Catalogue of works for various instrumental and vocal ensembles.',
    'catalogue.empty':       'The catalogue will be available soon.',
    'works.link.audio':      'audio',
    'works.link.score':      'score',
    'works.link.note':       'programme note',
    'works.link.info':       '+info',

    // Recordings
    'recordings.title':       'Recordings',
    'recordings.description': 'A selection of available recordings.',
    'recordings.empty':       'Recordings will be available soon.',

    // Press
    'press.title':       'Press',
    'press.description': 'Reviews, interviews and media mentions.',
    'press.empty':       'Press entries will be available soon.',

    // Contact
    'contact.title':       'Contact',
    'contact.description': 'For enquiries about scores, commissions or collaborations.',
    'contact.email.label': 'Email',
    'contact.email.value': 'hola@miqueloliu.cat',
    'contact.social.label':'Social media',
    'contact.general.label': 'General information',
    'contact.general.text':  'For any enquiry, please write to the email address above.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. All rights reserved.',
  },
};
