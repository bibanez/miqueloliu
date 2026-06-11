/*
 * Catàleg d'obres — dades estàtiques
 *
 * Estructura:
 *   WORKS = [ { id, name: {ca, es, en}, works: [ ...obra ] } ]
 *
 * Camps d'una obra (tots opcionals excepte id i title):
 *   id              slug estable (serveix d'àncora #work-<id>)
 *   title           títol (string, o {ca, es, en} si es tradueix)
 *   years           anys de composició, p.ex. '2024-2025'
 *   subtitle        línia sota el títol, p.ex. 'Sobre poemes d'Antoni Clapés'
 *   instrumentation formació o plantilla orquestral
 *   movements       [ ...títols de moviments ]
 *   duration        durada, p.ex. '12''
 *   details         [ ...línies en ordre: encàrrec, estrena, enregistrament, premi… ]
 *   links           { audio, score, info } — URLs; només es mostren si existeixen.
 *                   Un audio acabat en .mp3/.m4a/.ogg/.wav es mostra com a
 *                   reproductor incrustat en lloc d'enllaç extern.
 *   note            nota de programa ({ca, es, en} o string) — es mostra plegada
 *   parts           [ ...sub-peces amb la mateixa estructura ] (p.ex. quaderns)
 *
 * Els camps de text admeten {ca, es, en} amb fallback a 'ca', i el marcatge
 * lleuger *negreta* i _cursiva_.
 */

const WORKS = [
  {
    id: 'orquestra',
    name: { ca: 'Orquestra', es: 'Orquesta', en: 'Orchestra' },
    works: [
      {
        id: 'pluja',
        title: 'Pluja',
        years: '2024-2025',
        instrumentation: '[3.2.3.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -12.12.10.8.6.]',
        duration: '12’',
        details: [
          { ca: 'Encàrrec de L’Auditori de Barcelona-OBC' },
          { ca: 'Estrena: Novembre 2025. L’Auditori de Barcelona, Liederhalle Stuttgart, Elbphilharmonie Hamburg, Tonhalle Düsseldorf, Palacio Euskalduna Bilbao, Kursaal Donostia/San Sebastián. OBC, Ludovic Morlot' },
        ],
      },
      {
        id: 'in-luce-praesenti',
        title: 'In luce praesenti',
        years: '2019-2020',
        instrumentation: '[2.2.2.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -14.12.10.8.6.]',
        duration: '17’',
        details: [
          { ca: 'Encàrrec de L’Auditori de Barcelona – Fundació SGAE-AEOS' },
          { ca: 'Estrena: Octubre 2021. L’Auditori. OBC, Juanjo Mena' },
          { ca: 'Enregistrament: Juliol 2022. OBC, Benjamin Schwarz' },
        ],
      },
      {
        id: 'allegories-de-tardor-orquestra',
        title: 'Al·legories de tardor – Microludis per a orquestra',
        years: '2012-2013',
        instrumentation: '[2.2.2.2.-2.2.2.1.-3 perc. –arp. -12.10.8.8.6.]',
        duration: '13’',
        details: [
          { ca: 'XXXII Premi Reina Sofia de Composició Musical' },
          { ca: 'Estrena: Octubre 2015. Teatro Monumental, Madrid. Orquesta de RTVE, Carlos Kalmar' },
        ],
      },
    ],
  },

  {
    id: 'cambra',
    name: { ca: 'Cambra', es: 'Cámara', en: 'Chamber' },
    works: [
      {
        id: 'un-simple-aleteig',
        title: 'Un simple aleteig...',
        years: '2022-2023',
        instrumentation: { ca: 'Trio (violí, violoncel i piano)' },
        duration: '12’',
        details: [
          { ca: 'Estrena: Novembre 2024. Auditori de St. Josep, Moià. Tempus Trio' },
        ],
      },
      {
        id: 'set-cants',
        title: 'Set cants',
        years: '2021',
        subtitle: { ca: 'Sobre poemes d’Antoni Clapés' },
        instrumentation: { ca: 'Soprano i piano' },
        duration: '14’',
        details: [
          { ca: 'Encàrrec de l’Associació Joan Manén' },
          { ca: 'Estrena: Juny de 2023. Ateneu Barcelonès. Elena Copons, David Malet' },
        ],
      },
      {
        id: 'angel-terrible',
        title: 'L’àngel terrible',
        years: '2017-2018',
        instrumentation: { ca: 'Quartet de corda' },
        duration: '14’',
        details: [
          { ca: 'Encàrrec de Dalia Quartet' },
          { ca: 'Estrena: Abril 2019. Xarxa de músiques de Joventuts Musicals de Catalunya' },
        ],
      },
      {
        id: 'jardins-del-silenci',
        title: 'Jardins del silenci',
        years: '2016',
        instrumentation: { ca: 'Viola i piano' },
        duration: '11’',
        details: [
          { ca: 'Encàrrec de Joventuts Musicals de Catalunya – Fundació Ferrer-Salat' },
          { ca: 'Estrena: Xarxa de músiques (2017) i L’Auditori de BCN, sala2 (abril 2018). Agnès Mauri, Benedek Horváth' },
        ],
      },
      {
        id: 'ofrena-a-ant-negre',
        title: 'Ofrena a Ant Negre',
        years: '2014-2015',
        instrumentation: { ca: 'Ensemble: flauta en sol, corn anglès, clarinet baix, percussió, arpa, piano, violí, viola i violoncel' },
        duration: '12’',
      },
      {
        id: 'inabastable-perfil',
        title: 'L’inabastable perfil – Homenatge E. Chillida',
        years: '2013-2014',
        instrumentation: { ca: 'Violí i piano' },
        duration: '8’',
        details: [
          { ca: 'Estrena: Juny 2015. Nagoya, Japó. Ensemble Musica QuLacoza' },
        ],
      },
      {
        id: 'set-extractes-petit-princep',
        title: 'Set extractes de El Petit Príncep',
        years: '2010',
        instrumentation: { ca: 'Flauta de bec i dos percussionistes' },
        duration: '25’',
        details: [
          { ca: 'Encàrrec del Festival de música de Campllong' },
          { ca: 'Estrena: Agost 2010. Campllong. Tiam Goudarzi, Percussions de Barcelona' },
        ],
      },
      {
        id: 'lament-de-pluja',
        title: 'Lament de pluja',
        years: '2008',
        instrumentation: { ca: 'Quartet de percussió' },
        duration: '7’',
        details: [
          { ca: 'Encàrrec de Percussions de Barcelona' },
          { ca: 'Estrena: Juny 2008. Caja Madrid, Barcelona. Percussions de Barcelona' },
        ],
      },
    ],
  },

  {
    id: 'solista',
    name: { ca: 'Solista', es: 'Solista', en: 'Solo' },
    works: [
      {
        id: 'album-per-a-la-joventut',
        title: 'Àlbum per a la joventut',
        years: '2024-2026',
        instrumentation: { ca: 'Piano' },
        duration: '35-40’',
        details: [
          { ca: 'En preparació' },
        ],
      },
      {
        id: 'llibre-dhores',
        title: 'Llibre d’hores. Cicle complert de Preludis per a piano, en quatre quaderns',
        years: '2016-2022',
        duration: '45’',
        parts: [
          {
            id: 'preludis-primer-quadern',
            title: 'Dos preludis per a piano. Primer quadern – Homenatge a Claude Debussy',
            years: '2016',
            movements: [
              { ca: 'Misteri de nit' },
              { ca: 'Misteri de llum' },
            ],
            duration: '10’',
            details: [
              { ca: 'Encàrrec de Joventuts Musicals de Catalunya – Fundació Ferrer-Salat' },
              { ca: 'Estrena: Xarxa de músiques (2017) i L’Auditori de BCN, sala2 (abril 2018). Albert Cano' },
            ],
          },
          {
            id: 'preludis-segon-quadern',
            title: 'Preludis per a piano. Segon quadern',
            years: '2018-2019',
            movements: [
              { ca: 'Misteri de l’entrega' },
              { ca: 'Misteri de l’instant' },
            ],
            duration: '11’',
            details: [
              { ca: 'Estrena: Setembre 2021. Miquel Villalba. Monestir de St. Daniel, Girona' },
            ],
          },
          {
            id: 'preludis-tercer-quadern',
            title: 'Preludis per a piano. Tercer quadern',
            years: '2020-2021',
            movements: [
              { ca: 'Misteri del temps' },
              { ca: 'Misteri del dolor' },
            ],
            duration: '12’',
            details: [
              { ca: 'Encàrrec del Palau de la Música Catalana – Ajuntament de BCN' },
              { ca: 'Estrena: Desembre 2023. Miquel Villalba' },
            ],
          },
          {
            id: 'preludis-quart-quadern',
            title: 'Preludis per a piano. Quart quadern',
            years: '2021-2022',
            movements: [
              { ca: 'Misteri de la confiança' },
              { ca: 'Misteri de pau' },
            ],
            duration: '10’',
            details: [
              { ca: 'Estrena: CD Llibre d’hores. Ficta - Desembre 2023. Miquel Villalba' },
            ],
          },
        ],
      },
      {
        id: 'cantic',
        title: 'Càntic',
        years: '2018-2019',
        instrumentation: { ca: 'Flauta' },
        duration: '3’',
        details: [
          { ca: 'Encàrrec del festival Mixtur per a Tm+ensemble' },
          { ca: 'Estrena: Abril 2019. Gilles Burgos. Fabra i Coats, Barcelona' },
        ],
      },
      {
        id: 'fondres',
        title: 'Fondre’s',
        years: '2018',
        subtitle: { ca: 'Estudi de concert per a vibràfon' },
        duration: '7’',
        details: [
          { ca: 'Encàrrec de Miquel Bernat' },
          { ca: 'Estrena: Desembre 2019. Évora, Portugal' },
        ],
      },
      {
        id: 'despertar',
        title: 'Despertar',
        years: '2011',
        instrumentation: { ca: 'Shakuhachi 2.4' },
        duration: '5’',
        details: [
          { ca: 'Estrena: Juliol 2013. European Shakuhachi Society Summer School, L’Auditori de Barcelona, Sala4. Jim Franklin' },
        ],
      },
      {
        id: 'allegories-de-tardor-piano',
        title: 'Al·legories de tardor – Microludis per a piano',
        years: '2010-2011',
        duration: '12’',
        details: [
          { ca: 'Estrena: (parcial) Desembre 2011. El Círcol, Reus. Jordi López Roig' },
        ],
      },
      {
        id: 'meditatio',
        title: 'Meditatio',
        years: '2007',
        instrumentation: { ca: 'Clarinet sib' },
        duration: '5’',
        details: [
          { ca: 'Estrena: Maig 2007. Ateneu Barcelonès. Cicle música del segle XX-XXI. Josep Fuster' },
        ],
      },
      {
        id: 'aunque-es-de-noche',
        title: '...aunque es de noche',
        years: '2005-2006',
        instrumentation: { ca: 'Marimba' },
        duration: '11’',
        details: [
          { ca: 'Estrena: Juny 2008. Caja Madrid, Barcelona. Sebastià Bel' },
        ],
      },
      {
        id: 'dues-pagines-per-a-viola',
        title: 'Dues pàgines per a viola',
        years: '2001',
        duration: '8’',
        details: [
          { ca: 'Estrena: Maig 2009. Les Encies (Girona). Mariona Oliu' },
        ],
      },
    ],
  },

  {
    id: 'veu',
    name: { ca: 'Veu', es: 'Voz', en: 'Voice' },
    works: [
      {
        id: 'set-cants-veu',
        title: 'Set cants',
        years: '2021',
        subtitle: { ca: 'Sobre poemes d’Antoni Clapés' },
        instrumentation: { ca: 'Soprano i piano' },
        duration: '14’',
        details: [
          { ca: 'Encàrrec de l’Associació Joan Manén' },
          { ca: 'Estrena: Juny de 2023. Ateneu Barcelonès. Elena Copons, David Malet' },
        ],
      },
      {
        id: 'sant-josep-va-a-buscar-foc',
        title: 'Sant Josep va a buscar foc',
        years: '2024',
        subtitle: { ca: 'Arranjament Nadala tradicional catalana' },
        instrumentation: { ca: 'Cor d’infants ad libitum i cor mixt [SSAATTBB]' },
        duration: '5’',
        details: [
          { ca: 'Encàrrec de l’Emvic' },
          { ca: 'Estrena: Novembre 2024. Vic. Grup d’infants de l’Emvic, Cor Canigó' },
        ],
      },
      {
        id: 'jo-laimo',
        title: 'Jo l’aimo.',
        years: '2023',
        instrumentation: { ca: 'Viola i cor mixt [SSAATTBB]' },
        duration: '6’',
        details: [
          { ca: 'Encàrrec d’Agnès Mauri' },
          { ca: 'Estrena: Març 2025. Barcelona, Basilea, Cardedeu. Agnès Mauri, Cor Noctes' },
        ],
      },
      {
        id: 'da-pacem',
        title: 'Da pacem',
        years: '2020',
        instrumentation: { ca: 'Cor mixt a cappella [SATB]' },
        duration: '3’',
        details: [
          { ca: 'En motiu del centenari de la coral Retorn Planenc' },
          { ca: 'Estrena: Desembre 2021. Les Planes d’Hostoles' },
        ],
      },
      {
        id: 'antifona-i-doxologia',
        title: 'Antífona i doxologia',
        years: '2017',
        instrumentation: { ca: 'Cor mixt a capella (o amb suport d’orgue) [SATB]' },
        duration: '3’',
        details: [
          { ca: 'Encàrrec de Pueri Cantores' },
          { ca: 'Estrena: Juliol 2018. Monestir de Montserrat' },
        ],
      },
    ],
  },

  {
    id: 'pedagogic',
    name: { ca: 'Pedagògic', es: 'Pedagógico', en: 'Pedagogical' },
    works: [
      {
        id: 'album-per-a-la-joventut-pedagogic',
        title: 'Àlbum per a la joventut',
        years: '2024-2026',
        instrumentation: { ca: 'Piano' },
        duration: '35-40’',
        details: [
          { ca: 'En preparació' },
        ],
      },
      {
        id: 'sis-nadales-tradicionals',
        title: 'Sis Nadales tradicionals catalanes',
        instrumentation: { ca: 'Saxo i piano. Nivell Elemental' },
        details: [
          { ca: 'En preparació' },
        ],
      },
      {
        id: 'tres-estudis-vibrafon',
        title: 'Tres estudis per a vibràfon',
        years: '2011',
        duration: '7’',
        details: [
          { ca: 'Encàrrec de Percussions de Barcelona' },
        ],
      },
    ],
  },
];
