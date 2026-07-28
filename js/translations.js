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
    'nav.contact':     'Contacte',

    // Frontpage — hero
    'home.hero.subtitle': 'compositor',

    // Frontpage — intro (CV curt)
    'home.intro.more': 'biografia completa',

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
    'bio.toggle.short': 'Versió curta',
    'bio.toggle.long':  'Versió llarga',

    // Works
    'catalogue.title':       'Obres',
    'catalogue.description': 'Catàleg d’obres per a diverses formacions instrumentals i vocals.',
    'catalogue.empty':       'El catàleg es carregarà properament.',
    'works.link.audio':      'àudio',
    'works.link.score':      'partitura',
    'works.link.note':       'nota de programa',
    'works.link.info':       '+info',
    'works.parts.show':      'quaderns',
    'works.score.label':     'Partitura:',
    'works.score.ficta':     'Ficta',
    'works.score.contact':   'Contactar',
    'works.orchestra.hint':          'disposició',
    'works.orchestra.diagram.label': 'Disposició de l’orquestra a l’escenari',
    'works.orchestra.conductor':     'director',
    'works.orchestra.flutes':        'flautes',
    'works.orchestra.flutes.one':    'flauta',
    'works.orchestra.oboes':         'oboès',
    'works.orchestra.oboes.one':     'oboè',
    'works.orchestra.clarinets':     'clarinets',
    'works.orchestra.clarinets.one': 'clarinet',
    'works.orchestra.bassoons':      'fagots',
    'works.orchestra.bassoons.one':  'fagot',
    'works.orchestra.horns':         'trompes',
    'works.orchestra.horns.one':     'trompa',
    'works.orchestra.trumpets':      'trompetes',
    'works.orchestra.trumpets.one':  'trompeta',
    'works.orchestra.trombones':     'trombons',
    'works.orchestra.trombones.one': 'trombó',
    'works.orchestra.tuba':          'tubes',
    'works.orchestra.tuba.one':      'tuba',
    'works.orchestra.timpani':       'timbales',
    'works.orchestra.timpani.one':   'timbales',
    'works.orchestra.percussion':    'percussionistes',
    'works.orchestra.percussion.one':'percussionista',
    'works.orchestra.harp':          'arpes',
    'works.orchestra.harp.one':      'arpa',
    'works.orchestra.celesta':       'celestes',
    'works.orchestra.celesta.one':   'celesta',
    'works.orchestra.violins1':      'violins I',
    'works.orchestra.violins2':      'violins II',
    'works.orchestra.violas':        'violes',
    'works.orchestra.cellos':        'violoncels',
    'works.orchestra.basses':        'contrabaixos',

    // Contact
    'contact.title':                  'Contacte',
    'contact.description':            'Per a consultes sobre partitures, encàrrecs, concerts o col·laboracions.',
    'contact.card.title':             'Informació de contacte',
    'contact.email.label':            'Correu electrònic',
    'contact.email.value':            'mqoliu@gmail.com',
    'contact.copy.button':            'Copiar adreça',
    'contact.copy.copied':            'Copiat al porta-retalls',
    'contact.location.label':         'Ubicació',
    'contact.location.value':         'Barcelona / Catalunya',
    'contact.publisher.label':        'Partitures i edició',
    'contact.publisher.text':         'Edicions impreses disponibles a Editorial Ficta. Per a partitures d’estudi o material de lloguer d’obres simfòniques i de cambra, podeu sol·licitar-ho directament.',
    'contact.publisher.link':         'Visitar Editorial Ficta',
    'contact.form.title':             'Enviar un missatge',
    'contact.form.name':              'Nom i cognoms',
    'contact.form.name.placeholder':  'El teu nom',
    'contact.form.email':             'Correu electrònic',
    'contact.form.email.placeholder': 'el-teu-correu@exemple.cat',
    'contact.form.subject':           'Motiu de la consulta',
    'contact.form.subject.select':    'Selecciona una opció...',
    'contact.form.subject.general':   'Consulta general',
    'contact.form.subject.score':     'Sol·licitud de partitura / material',
    'contact.form.subject.commission':'Encàrrec o proposta de concert',
    'contact.form.subject.other':     'Altres col·laboracions',
    'contact.form.message':           'Missatge',
    'contact.form.message.placeholder': 'Escriu el teu missatge aquí...',
    'contact.form.send':              'Enviar correu electrònic',
    'contact.form.notice':            'S’obrirà el teu client de correu electrònic preconfigurat amb les dades introduïdes.',
    'contact.form.success':           'Gràcies! S’ha preparat el correu per enviar.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Tots els drets reservats.',
  },

  /* ——— Spanish ——— */
  es: {
    // Navigation
    'nav.home':        'Inicio',
    'nav.biography':   'Biografía',
    'nav.catalogue':   'Obras',
    'nav.contact':     'Contacto',

    // Frontpage — hero
    'home.hero.subtitle': 'compositor',

    // Frontpage — intro (CV curt)
    'home.intro.more': 'biografía completa',

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
    'bio.toggle.short': 'Versión corta',
    'bio.toggle.long':  'Versión larga',

    // Works
    'catalogue.title':       'Obras',
    'catalogue.description': 'Catálogo de obras para diversas formaciones instrumentales y vocales.',
    'catalogue.empty':       'El catálogo se cargará próximamente.',
    'works.link.audio':      'audio',
    'works.link.score':      'partitura',
    'works.link.note':       'nota de programa',
    'works.link.info':       '+info',
    'works.parts.show':      'cuadernos',
    'works.score.label':     'Partitura:',
    'works.score.ficta':     'Ficta',
    'works.score.contact':   'Contactar',
    'works.orchestra.hint':          'disposición',
    'works.orchestra.diagram.label': 'Disposición de la orquesta en el escenario',
    'works.orchestra.conductor':     'director',
    'works.orchestra.flutes':        'flautas',
    'works.orchestra.flutes.one':    'flauta',
    'works.orchestra.oboes':         'oboes',
    'works.orchestra.oboes.one':     'oboe',
    'works.orchestra.clarinets':     'clarinetes',
    'works.orchestra.clarinets.one': 'clarinete',
    'works.orchestra.bassoons':      'fagotes',
    'works.orchestra.bassoons.one':  'fagot',
    'works.orchestra.horns':         'trompas',
    'works.orchestra.horns.one':     'trompa',
    'works.orchestra.trumpets':      'trompetas',
    'works.orchestra.trumpets.one':  'trompeta',
    'works.orchestra.trombones':     'trombones',
    'works.orchestra.trombones.one': 'trombón',
    'works.orchestra.tuba':          'tubas',
    'works.orchestra.tuba.one':      'tuba',
    'works.orchestra.timpani':       'timbales',
    'works.orchestra.timpani.one':   'timbales',
    'works.orchestra.percussion':    'percusionistas',
    'works.orchestra.percussion.one':'percusionista',
    'works.orchestra.harp':          'arpas',
    'works.orchestra.harp.one':      'arpa',
    'works.orchestra.celesta':       'celestas',
    'works.orchestra.celesta.one':   'celesta',
    'works.orchestra.violins1':      'violines I',
    'works.orchestra.violins2':      'violines II',
    'works.orchestra.violas':        'violas',
    'works.orchestra.cellos':        'violonchelos',
    'works.orchestra.basses':        'contrabajos',

    // Contact
    'contact.title':                  'Contacto',
    'contact.description':            'Para consultas sobre partituras, encargos, conciertos o colaboraciones.',
    'contact.card.title':             'Información de contacto',
    'contact.email.label':            'Correo electrónico',
    'contact.email.value':            'mqoliu@gmail.com',
    'contact.copy.button':            'Copiar dirección',
    'contact.copy.copied':            'Copiado al portapapeles',
    'contact.location.label':         'Ubicación',
    'contact.location.value':         'Barcelona / Cataluña',
    'contact.publisher.label':        'Partituras y edición',
    'contact.publisher.text':         'Ediciones impresas disponibles en Editorial Ficta. Para partituras de estudio o material de alquiler de obras sinfónicas y de cámara, puede solicitarlo directamente.',
    'contact.publisher.link':         'Visitar Editorial Ficta',
    'contact.form.title':             'Enviar un mensaje',
    'contact.form.name':              'Nombre y apellidos',
    'contact.form.name.placeholder':  'Tu nombre',
    'contact.form.email':             'Correo electrónico',
    'contact.form.email.placeholder': 'tu-correo@ejemplo.com',
    'contact.form.subject':           'Motivo de la consulta',
    'contact.form.subject.select':    'Selecciona una opción...',
    'contact.form.subject.general':   'Consulta general',
    'contact.form.subject.score':     'Solicitud de partitura / material',
    'contact.form.subject.commission':'Encargo o propuesta de concierto',
    'contact.form.subject.other':     'Otras colaboraciones',
    'contact.form.message':           'Mensaje',
    'contact.form.message.placeholder': 'Escribe tu mensaje aquí...',
    'contact.form.send':              'Enviar correo electrónico',
    'contact.form.notice':            'Se abrirá tu cliente de correo electrónico preconfigurado con los datos introducidos.',
    'contact.form.success':           '¡Gracias! Se ha preparado el correo para enviar.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. Todos los derechos reservados.',
  },

  /* ——— English ——— */
  en: {
    // Navigation
    'nav.home':        'Home',
    'nav.biography':   'Biography',
    'nav.catalogue':   'Works',
    'nav.contact':     'Contact',

    // Frontpage — hero
    'home.hero.subtitle': 'composer',

    // Frontpage — intro (CV curt)
    'home.intro.more': 'full biography',

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
    'bio.toggle.short': 'Short version',
    'bio.toggle.long':  'Long version',

    // Works
    'catalogue.title':       'Works',
    'catalogue.description': 'Catalogue of works for various instrumental and vocal ensembles.',
    'catalogue.empty':       'The catalogue will be available soon.',
    'works.link.audio':      'audio',
    'works.link.score':      'score',
    'works.link.note':       'programme note',
    'works.link.info':       '+info',
    'works.parts.show':      'volumes',
    'works.score.label':     'Score:',
    'works.score.ficta':     'Ficta',
    'works.score.contact':   'Contact',
    'works.orchestra.hint':          'seating',
    'works.orchestra.diagram.label': 'Orchestra seating chart',
    'works.orchestra.conductor':     'conductor',
    'works.orchestra.flutes':        'flutes',
    'works.orchestra.flutes.one':    'flute',
    'works.orchestra.oboes':         'oboes',
    'works.orchestra.oboes.one':     'oboe',
    'works.orchestra.clarinets':     'clarinets',
    'works.orchestra.clarinets.one': 'clarinet',
    'works.orchestra.bassoons':      'bassoons',
    'works.orchestra.bassoons.one':  'bassoon',
    'works.orchestra.horns':         'horns',
    'works.orchestra.horns.one':     'horn',
    'works.orchestra.trumpets':      'trumpets',
    'works.orchestra.trumpets.one':  'trumpet',
    'works.orchestra.trombones':     'trombones',
    'works.orchestra.trombones.one': 'trombone',
    'works.orchestra.tuba':          'tubas',
    'works.orchestra.tuba.one':      'tuba',
    'works.orchestra.timpani':       'timpani',
    'works.orchestra.timpani.one':   'timpani',
    'works.orchestra.percussion':    'percussionists',
    'works.orchestra.percussion.one':'percussionist',
    'works.orchestra.harp':          'harps',
    'works.orchestra.harp.one':      'harp',
    'works.orchestra.celesta':       'celestas',
    'works.orchestra.celesta.one':   'celesta',
    'works.orchestra.violins1':      'violins I',
    'works.orchestra.violins2':      'violins II',
    'works.orchestra.violas':        'violas',
    'works.orchestra.cellos':        'cellos',
    'works.orchestra.basses':        'double basses',

    // Contact
    'contact.title':                  'Contact',
    'contact.description':            'For enquiries regarding scores, commissions, performances or collaborations.',
    'contact.card.title':             'Contact details',
    'contact.email.label':            'Email address',
    'contact.email.value':            'mqoliu@gmail.com',
    'contact.copy.button':            'Copy address',
    'contact.copy.copied':            'Copied to clipboard',
    'contact.location.label':         'Location',
    'contact.location.value':         'Barcelona / Catalonia',
    'contact.publisher.label':        'Scores & Publishing',
    'contact.publisher.text':         'Printed editions available via Editorial Ficta. For study scores or rental performance material for orchestral and chamber works, please inquire directly.',
    'contact.publisher.link':         'Visit Editorial Ficta',
    'contact.form.title':             'Send a message',
    'contact.form.name':              'Name',
    'contact.form.name.placeholder':  'Your name',
    'contact.form.email':             'Email address',
    'contact.form.email.placeholder': 'your-email@example.com',
    'contact.form.subject':           'Subject',
    'contact.form.subject.select':    'Select an option...',
    'contact.form.subject.general':   'General enquiry',
    'contact.form.subject.score':     'Score / performance material request',
    'contact.form.subject.commission':'Commission or concert proposal',
    'contact.form.subject.other':     'Other collaborations',
    'contact.form.message':           'Message',
    'contact.form.message.placeholder': 'Write your message here...',
    'contact.form.send':              'Send email',
    'contact.form.notice':            'This will open your default email client with your message pre-filled.',
    'contact.form.success':           'Thank you! Your email draft has been opened.',

    // Footer
    'footer.copyright': '© {year} Miquel Oliu. All rights reserved.',
  },
};
